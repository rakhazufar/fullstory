import moment from "moment";

export default function getTimeDifference(createdAt) {
  const now = moment();
  const timeDifference = moment(createdAt);
  const differenceInSeconds = now.diff(timeDifference, "seconds");
  const differenceInMinutes = now.diff(timeDifference, "minutes");
  const differenceInHours = now.diff(timeDifference, "hours");
  const differenceInDays = now.diff(timeDifference, "days");

  let displayTime;

  if (differenceInSeconds < 60) {
    displayTime = `${differenceInSeconds}s`;
  } else if (differenceInMinutes < 60) {
    displayTime = `${differenceInMinutes}m`;
  } else if (differenceInHours < 24) {
    displayTime = `${differenceInHours}h`;
  } else {
    displayTime = `${differenceInDays}d`;
  }

  return displayTime;
}
