export function isDate(dateStr: string | undefined): boolean {
    if (!dateStr) return true;
    return !isNaN(new Date(dateStr).getDate());
}
