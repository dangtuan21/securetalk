const Utility = {
  getTime,
};

function getTime(unix_timestamp: number) {
  let date = new Date(unix_timestamp * 1000);

  let hours = date.getHours();

  let minutes = "0" + date.getMinutes();

  let formattedTime = hours + ":" + minutes.substr(-2);

  return formattedTime;
}

export default Utility;
