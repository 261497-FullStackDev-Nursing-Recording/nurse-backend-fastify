import { faker } from '@faker-js/faker';
import {
    Field,
    FieldCode,
    Patient,
    PrismaClient,
    Role,
    Shift,
    Status,
    User,
} from '@prisma/client';
import { fastify } from 'fastify';
import fastifyBcrypt from 'fastify-bcrypt';

// Setting
const settings = {
    numUsers: 100,
    numPatients: 100,
    numUserOnPatients: 500,
    numRecords: 100,
    numFieldsPerRecords: 10,
    numFieldsOnFieldsPerRecord: 10,
};

const prisma = new PrismaClient();

async function main() {
    const app = fastify();
    app.register(fastifyBcrypt);
    await app.ready();

    await prisma.fieldOnField.deleteMany({});
    await prisma.userOnPatient.deleteMany({});
    await prisma.field.deleteMany({});
    await prisma.record.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.patient.deleteMany({});

    //  Create patient
    const patitentsData = [...Array(settings.numPatients).keys()].map((idx) => {
        return {
            identification_id: faker.string.numeric(5),
            f_name: faker.person.firstName(),
            l_name: faker.person.lastName(),
            hn: faker.string.numeric(7),
            an: faker.string.numeric(7),
            age: faker.number.int({ min: 10, max: 80 }),
            birthday: faker.date.birthdate({ min: 10, max: 80, mode: 'age' }),
            phone_number: '0' + faker.string.numeric(9),
            current_bed_number: faker.number.int(100),
            isQuit: faker.datatype.boolean(),
            status: getRandomStatus(),
        };
    });
    await prisma.patient.createMany({ data: patitentsData });

    //  Create users
    const password = await app.bcrypt.hash('1234');
    const usersData = [...Array(settings.numUsers).keys()].map((idx) => {
        return {
            f_name: faker.person.firstName(),
            l_name: faker.person.lastName(),
            username: `username${idx + 1}`,
            password: password,
            role: getRandomRole(),
        };
    });
    // Fix some of the user roles for development
    usersData[0].role = Role.ADMIN;
    usersData[1].role = Role.USER;
    await prisma.user.createMany({ data: usersData });

    // Create random links between users and patients
    const nurses = await prisma.user.findMany({ where: { role: Role.NURSE } });
    const patients = await prisma.patient.findMany();
    const usersOnPatients = [...Array(settings.numUserOnPatients).keys()].map(
        (idx) => ({
            user_id: getRandomElement<User>(nurses).id,
            patient_id: getRandomElement<Patient>(patients).id,
        }),
    );
    for (const uop of usersOnPatients) {
        try {
            await prisma.userOnPatient.create({
                data: uop,
            });
        } catch (e) {
            // If there is a duplicate of user_id and patient_id, just ignore it
        }
    }

    // Create records
    const recordsData = [...Array(settings.numRecords).keys()].map((idx) => ({
        user_id: getRandomElement<User>(nurses).id,
        patient_id: getRandomElement<Patient>(patients).id,
        bed_number: faker.number.int(100),
        ward: 'Ward',
        shift: getRandomShift(),
        visit_number: faker.string.numeric(8),
        disease_group: 'DISEASE_GROUP_1',
    }));

    await prisma.record.createMany({
        data: recordsData,
    });

    // Create nurse notes
    const records = await prisma.record.findMany({});
    records.forEach(async (record) => {
        const fieldsData = [...Array(settings.numFieldsPerRecords).keys()].map(
            (idx) => {
                return {
                    record_id: record.id,
                    field_type: getRandomFieldCode(),
                    field_pre_label: faker.lorem.sentence(),
                    field_data: faker.lorem.paragraph(),
                    field_date: faker.date.birthdate({
                        min: 2,
                        max: 10,
                        mode: 'age',
                    }),
                };
            },
        );
        await prisma.field.createMany({ data: fieldsData });
        const fields = await prisma.field.findMany({
            where: { record_id: record.id },
        });

        const fieldsOnFields = [
            ...Array(settings.numFieldsOnFieldsPerRecord).keys(),
        ].map((idx) => {
            const parent = getRandomElement<Field>(fields);
            const fieldsFilt = fields.filter((f) => f.id !== parent.id);
            const child = getRandomElement<Field>(fieldsFilt);
            return { parent_id: parent.id, child_id: child.id };
        });

        for (const fof of fieldsOnFields) {
            try {
                await prisma.fieldOnField.create({
                    data: fof,
                });
            } catch (e) {
                // If there is a duplicate of user_id and patient_id, just ignore it
            }
        }
    });
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

function getRandomElement<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomFieldCode() {
    const FieldCodes = Object.values(FieldCode);
    return getRandomElement(FieldCodes);
}

function getRandomStatus() {
    const Statuses = Object.values(Status);
    return getRandomElement(Statuses);
}

function getRandomRole() {
    const Roles = Object.values(Role);
    return getRandomElement(Roles);
}

function getRandomShift() {
    const Shifts = Object.values(Shift);
    return getRandomElement(Shifts);
}
