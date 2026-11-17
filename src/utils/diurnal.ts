// Hindi diurnal period label mapper:
// 4 AM-11 AM: सुबह (Morning), 12 PM-4 PM: दोपहर (Afternoon), 5 PM-6 PM: शाम (Evening), 7 PM-3 AM: रात (Night)
export function getHindiPeriodLabel(timeStrOrLabel: string): string {
  let hour = -1;
  const match = timeStrOrLabel.match(/(\d+)\s*(AM|PM)/i);
  if (match) {
    let h = parseInt(match[1], 10);
    const meridiem = match[2].toUpperCase();
    if (meridiem === 'PM' && h !== 12) h += 12;
    if (meridiem === 'AM' && h === 12) h = 0;
    hour = h;
  } else if (timeStrOrLabel.includes('T') || timeStrOrLabel.includes('-')) {
    const d = new Date(timeStrOrLabel);
    if (!isNaN(d.getTime())) {
      hour = d.getHours();
    }
  }

  if (hour >= 4 && hour < 12) {
    return 'सुबह (Morning)';
  }
  if (hour >= 12 && hour < 17) {
    return 'दोपहर (Afternoon)';
  }
  if (hour >= 17 && hour < 19) {
    // 5 PM and 6 PM
    return 'शाम (Evening)';
  }
  // 7 PM, 8 PM, 9 PM, 10 PM, 11 PM, 12 AM - 3 AM
  return 'रात (Night)';
}
