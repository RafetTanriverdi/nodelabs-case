import {
    createBrowserRouter,
    RouterProvider,
    type RouteObject,
} from "react-router-dom";
import { lazy, Suspense, type ComponentType } from "react";
import App from "./App";
import { routes, type RouteType } from "@rt/routing/routes";
import ErrorPage from "@rt/pages/OtherPages/ErrorPage/ErrorPage";
import ErrorBoundary from "@rt/pages/OtherPages/ErrorPage/ErrorBoundaryPage";

const AppClientRouter = () => {
    const pages = import.meta.glob("./pages/**/*.tsx") as Record<
        string,
        () => Promise<{ default: ComponentType<unknown> }>
    >;

    const renderRoute = (route: RouteType): RouteObject => {
        const importer = pages[`./pages/${route.filePath}.tsx`];
        if (!importer) {
            throw new Error(
                `Route module not found: ./pages/${route.filePath}.tsx`
            );
        }
        const PageComponent = lazy(importer);

        const children = route.children?.map(renderRoute);

        return {
            path: route.path,
            element: (
                <Suspense fallback={'...loading'}>
                    <PageComponent />
                </Suspense>
            ),
            children,
        };
    };

    const router = createBrowserRouter([
        {
            errorElement: <ErrorPage />,
            element: (
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            ),
            children: routes.map(renderRoute),
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppClientRouter;
