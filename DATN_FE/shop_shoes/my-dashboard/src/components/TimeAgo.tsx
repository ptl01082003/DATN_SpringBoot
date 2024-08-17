import dayjs from "dayjs";
import "dayjs/locale/vi";

import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

dayjs.locale("vi");

dayjs.extend(relativeTime);

const TimeAgo = ({ time }: { time: string }) => {
  const [timeAgo, setTimeAgo] = useState(dayjs(time).fromNow());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgo(dayjs(time).fromNow());
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
