export async function getStartAndEndDates(date: Date) {
    const month = date.getMonth();
  
    let startMonth, endMonth, semester;
  
    if (month >= 0 && month <= 3) {
      startMonth = 0; // January
      endMonth = 3; // April
      semester = `Sping` + date.getFullYear();
    } else if (month >= 4 && month <= 7) {
      startMonth = 4; // May
      endMonth = 7; // August
      semester = `Summer` + date.getFullYear();
    } else {
      startMonth = 8; // September
      endMonth = 11; // December
      semester = `Fall` + date.getFullYear();
    }
  
    const start_date = (new Date(date.getFullYear(), startMonth, 1)).toISOString().slice(0, 10); // first day of startMonth
    const end_date = (new Date(date.getFullYear(), endMonth + 1, 0)).toISOString().slice(0, 10); // last day of endMonth
    
    return { start_date, end_date, semester };
  }