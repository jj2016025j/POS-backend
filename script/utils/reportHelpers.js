// db/reportHelpers.js

// 確定時間間隔
function determineTimeInterval(startDate, endDate) {
  const diffMs = endDate - startDate;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays <= 1) return 'HOUR';
  else if (diffDays <= 7) return 'DAY';
  else if (diffDays <= 30) return 'DAY';
  else if (diffDays <= 90) return 'MONTH';
  else if (diffDays <= 180) return 'MONTH';
  return 'YEAR';
}

module.exports = { determineTimeInterval };

exports.sendResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    status: statusCode < 400 ? 'success' : 'error',
    message: message,
    data: data,
  });
};
