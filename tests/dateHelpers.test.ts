import { describe, it, expect } from "vitest";
import { toISODate, getWeekDates, formatDayLabel, isToday } from "../src/utils/dateHelpers";

describe("toISODate", () => {
    it("convierte una fecha a formato YYYY-MM-DD", () => {
        const date = new Date(2026, 8, 16); // 16 de septiembre de 2026
        expect(toISODate(date)).toBe("2026-09-16");
    });

    it("agrega ceros a la izquierda en mes y día de un dígito", () => {
        const date = new Date(2026, 0, 5); // 5 de enero
        expect(toISODate(date)).toBe("2026-01-05");
    });
});

describe("getWeekDates", () => {
    it("devuelve 7 fechas", () => {
        const week = getWeekDates(0);
        expect(week).toHaveLength(7);
    });

    it("la primera fecha de la semana es un lunes", () => {
        const week = getWeekDates(0);
        expect(week[0].getDay()).toBe(1); // 1 = lunes en JS
    });

    it("con offset 1 devuelve la semana siguiente", () => {
        const currentWeek = getWeekDates(0);
        const nextWeek = getWeekDates(1);
        const diffInDays =
            (nextWeek[0].getTime() - currentWeek[0].getTime()) / (1000 * 60 * 60 * 24);
        expect(diffInDays).toBe(7);
    });
});

describe("formatDayLabel", () => {
    it("devuelve la abreviatura correcta del día", () => {
        const monday = new Date(2026, 8, 14); // lunes
        expect(formatDayLabel(monday)).toBe("Lun");
    });
});

describe("isToday", () => {
    it("devuelve true para la fecha actual", () => {
        expect(isToday(new Date())).toBe(true);
    });

    it("devuelve false para una fecha pasada", () => {
        const pastDate = new Date(2020, 0, 1);
        expect(isToday(pastDate)).toBe(false);
    });
});