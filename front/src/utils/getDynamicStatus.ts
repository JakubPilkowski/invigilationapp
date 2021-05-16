const oneHour = () => {
  const hour = new Date(0);
  hour.setUTCHours(1);
  return hour.getTime();
};

const oneMinute = () => {
  const minute = new Date(0);
  minute.setMinutes(1);
  return minute.getTime();
};

function addZero(i: number | string): string | number {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

export default function getDynamicStatus(status: string, lastInteractionTime: string): string {
  const date = new Date().getTime();
  const lastInteractionDate = new Date(lastInteractionTime).getTime();
  const subtract = new Date(date - lastInteractionDate);
  const subtractTime = subtract.getTime();

  if (subtractTime >= oneMinute() && subtractTime <= oneHour() && status === 'Aktywny') {
    return `Nieaktywny od ${addZero(subtract.getMinutes())}:${addZero(subtract.getSeconds())}`;
  } else if (subtractTime >= oneHour() && status === 'Aktywny') {
    return `Nieaktywny od bardzo dawna`;
  } else {
    return status;
  }
}
