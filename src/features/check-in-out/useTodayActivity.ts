import { useQuery } from "@tanstack/react-query";

import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
    const { data, isFetching: isActivitiesLoading } = useQuery({
        queryKey: ["today-activity"],
        queryFn: getStaysTodayActivity,
        retry: false,
    });

    const activities = data?.data;

    return { activities, isActivitiesLoading };
}
