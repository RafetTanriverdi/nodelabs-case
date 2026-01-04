import axiosInstance from "@rt/api/http"
import { useQuery } from "@tanstack/react-query"

export default function DashboardPage() {
  const { data } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      const res = await axiosInstance.get('/financial/summary')
      return res.data
    }
  })
  console.log(data);
  return (
    <div>DashboardPage</div>
  )
}
