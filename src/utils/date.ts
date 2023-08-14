export function isDate(dateStr: string | undefined) {
    if (!dateStr) return false;
    return !isNaN(new Date(dateStr).getDate());
}
