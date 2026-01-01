import type { RouteType } from "@rt/routing/routes";

export function flattenRoutes(
    routes: RouteType[],
    parentPath: string = ""
  ): Array<RouteType & { fullPath: string }> {
    const flattened: Array<RouteType & { fullPath: string }> = [];
  
    for (const route of routes) {

      const combinedPath = route.path
        ? route.path.startsWith("/")
          ? route.path 
          : `${parentPath.replace(/\/$/, "")}/${route.path}`
        : parentPath;
  
      const newRoute: RouteType & { fullPath: string } = {
        ...route,
        fullPath: combinedPath,
      };
  
      flattened.push(newRoute);
  
      if (route.children) {
        const childRoutes = flattenRoutes(route.children, combinedPath);
        flattened.push(...childRoutes);
      }
    }
  
    return flattened;
  }
  