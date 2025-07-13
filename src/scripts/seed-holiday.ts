import { AppDataSource } from "@/config/database.config";
import { Holiday } from "@/modules/holidays/entities/holiday.entity";
import { TypeOfHoliday } from "@/modules/holidays/enums/holiday.enum";

export const seedHolidays = async () => {
  try {
    const holidayRepo = AppDataSource.getRepository(Holiday);

    // Clear old data
    await holidayRepo.createQueryBuilder().delete().where("1=1").execute();
    console.log("Cleared existing holidays");

    const holidays = [
      // Federal Holidays
      {
        holiday_id: "HD00000001",
        holiday_name: "New Year's Day",
        type_of_holiday: TypeOfHoliday.FEDERAL_HOLIDAY,
        date_of_holiday: new Date("2025-01-01T00:00:00Z"),
        note: "First day of the year",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000002",
        holiday_name: "Martin Luther King Jr. Day",
        type_of_holiday: TypeOfHoliday.FEDERAL_HOLIDAY,
        date_of_holiday: new Date("2025-01-20T00:00:00Z"),
        note: "Honoring MLK Jr.",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000003",
        holiday_name: "Presidents' Day",
        type_of_holiday: TypeOfHoliday.FEDERAL_HOLIDAY,
        date_of_holiday: new Date("2025-02-17T00:00:00Z"),
        note: "Honoring U.S. presidents",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000004",
        holiday_name: "Memorial Day",
        type_of_holiday: TypeOfHoliday.FEDERAL_HOLIDAY,
        date_of_holiday: new Date("2025-05-26T00:00:00Z"),
        note: "Remembering the fallen",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000005",
        holiday_name: "Juneteenth National Independence Day",
        type_of_holiday: TypeOfHoliday.FEDERAL_HOLIDAY,
        date_of_holiday: new Date("2025-06-19T00:00:00Z"),
        note: "End of slavery in the U.S.",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000006",
        holiday_name: "Independence Day",
        type_of_holiday: TypeOfHoliday.FEDERAL_HOLIDAY,
        date_of_holiday: new Date("2025-07-04T00:00:00Z"),
        note: "U.S. Independence Day",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000007",
        holiday_name: "Labor Day",
        type_of_holiday: TypeOfHoliday.FEDERAL_HOLIDAY,
        date_of_holiday: new Date("2025-09-01T00:00:00Z"),
        note: "Workers celebration",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000008",
        holiday_name: "Columbus Day",
        type_of_holiday: TypeOfHoliday.FEDERAL_HOLIDAY,
        date_of_holiday: new Date("2025-10-13T00:00:00Z"),
        note: "Christopher Columbus Day",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000009",
        holiday_name: "Veterans Day",
        type_of_holiday: TypeOfHoliday.FEDERAL_HOLIDAY,
        date_of_holiday: new Date("2025-11-11T00:00:00Z"),
        note: "Honoring military veterans",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000010",
        holiday_name: "Thanksgiving Day",
        type_of_holiday: TypeOfHoliday.FEDERAL_HOLIDAY,
        date_of_holiday: new Date("2025-11-27T00:00:00Z"),
        note: "Family & gratitude",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000011",
        holiday_name: "Christmas Day",
        type_of_holiday: TypeOfHoliday.FEDERAL_HOLIDAY,
        date_of_holiday: new Date("2025-12-25T00:00:00Z"),
        note: "Christmas holiday",
        is_deleted: false,
      },

      // States Holidays
      {
        holiday_id: "HD00000012",
        holiday_name: "Confederate Memorial Day",
        type_of_holiday: TypeOfHoliday.STATES_HOLIDAY,
        date_of_holiday: new Date("2025-04-28T00:00:00Z"),
        note: "Southern states remembrance",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000013",
        holiday_name: "Cesar Chavez Day",
        type_of_holiday: TypeOfHoliday.STATES_HOLIDAY,
        date_of_holiday: new Date("2025-03-31T00:00:00Z"),
        note: "Celebrated in CA, CO, TX",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000014",
        holiday_name: "Patriots' Day",
        type_of_holiday: TypeOfHoliday.STATES_HOLIDAY,
        date_of_holiday: new Date("2025-04-21T00:00:00Z"),
        note: "Observed in Massachusetts and Maine",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000015",
        holiday_name: "Emancipation Day",
        type_of_holiday: TypeOfHoliday.STATES_HOLIDAY,
        date_of_holiday: new Date("2025-04-16T00:00:00Z"),
        note: "Observed in Washington, D.C.",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000016",
        holiday_name: "Lincoln's Birthday",
        type_of_holiday: TypeOfHoliday.STATES_HOLIDAY,
        date_of_holiday: new Date("2025-02-12T00:00:00Z"),
        note: "Observed in Illinois and California",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000017",
        holiday_name: "Pioneer Day",
        type_of_holiday: TypeOfHoliday.STATES_HOLIDAY,
        date_of_holiday: new Date("2025-07-24T00:00:00Z"),
        note: "State holiday in Utah",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000018",
        holiday_name: "Nevada Day",
        type_of_holiday: TypeOfHoliday.STATES_HOLIDAY,
        date_of_holiday: new Date("2025-10-31T00:00:00Z"),
        note: "Celebration of Nevada's statehood",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000019",
        holiday_name: "Texas Independence Day",
        type_of_holiday: TypeOfHoliday.STATES_HOLIDAY,
        date_of_holiday: new Date("2025-03-02T00:00:00Z"),
        note: "Texas declared independence from Mexico",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000020",
        holiday_name: "Mardi Gras",
        type_of_holiday: TypeOfHoliday.STATES_HOLIDAY,
        date_of_holiday: new Date("2025-03-04T00:00:00Z"),
        note: "Carnival celebration in LA, AL, MS",
        is_deleted: false,
      },
      {
        holiday_id: "HD00000021",
        holiday_name: "Seward's Day",
        type_of_holiday: TypeOfHoliday.STATES_HOLIDAY,
        date_of_holiday: new Date("2025-03-31T00:00:00Z"),
        note: "Commemorates Alaska Purchase",
        is_deleted: false,
      },
    ];

    // Dùng repository.create() để đảm bảo entity hợp lệ
    const holidayEntities = holidays.map((holiday) =>
      holidayRepo.create(holiday)
    );

    await holidayRepo.save(holidayEntities);
    console.log(`Seeded ${holidayEntities.length} holidays`);
  } catch (error) {
    console.error("Error seeding holidays:", error);
  }
};
