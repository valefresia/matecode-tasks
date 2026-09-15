const DAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const MOTIVATIONAL_PHRASES = [
    "Un paso a la vez, hoy también suma.",
    "Organizá tu día, tu yo de mañana te lo agradece.",
    "Las tareas chiquitas también cuentan.",
    "Hoy es un buen día para tachar algo de la lista.",
    "Vos podés con todo lo que anotaste.",
    "Progreso, no perfección.",
    "Cada tarea completada es una victoria.",
];

export const toISODate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const getWeekDates = (weekOffset: number): Date[] => {
    const today = new Date();
    const currentDay = today.getDay();
    const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday + weekOffset * 7);
    monday.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        return date;
    });
};

export const formatDayLabel = (date: Date): string => {
    return DAY_LABELS[date.getDay() === 0 ? 6 : date.getDay() - 1];
};

export const formatDayNumber = (date: Date): string => {
    return String(date.getDate());
};

export const isToday = (date: Date): boolean => {
    return toISODate(date) === toISODate(new Date());
};

export const getWeekRangeLabel = (dates: Date[]): string => {
    const start = dates[0];
    const end = dates[6];
    const startLabel = start.toLocaleDateString("es-AR", { day: "numeric", month: "short" });
    const endLabel = end.toLocaleDateString("es-AR", { day: "numeric", month: "short" });
    return `${startLabel} — ${endLabel}`;
};

export const getMotivationalPhrase = (): string => {
    const dayOfYear = Math.floor(
        (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    return MOTIVATIONAL_PHRASES[dayOfYear % MOTIVATIONAL_PHRASES.length];
};