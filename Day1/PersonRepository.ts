import { promises as fs } from "fs";
import { Person } from "./Person.js";

export class PersonRepository {
    private inputFile = "data/people.json";
    private outputFile = "data/people.output.json"

    async loadPeople(): Promise<Person[]> {
        try {
            const rawData = await fs.readFile(this.inputFile, "utf-8");
            const peopleData = JSON.parse(rawData);
            return peopleData.map((p: Person) => Person.fromJSON(p));
        } catch (error) {
            console.error("Error loading people:", error);
            return [];
        }

    }

    async savePeople(people: Person[]): Promise<void> {
        try {
            const peopleData = people.map(person => person.toJSON());
            const jsonData = JSON.stringify(peopleData, null, 2);
            await fs.writeFile(this.outputFile, jsonData, "utf-8");
            console.log(`Saved ${people.length} people to ${this.outputFile}`);
        } catch (error) {
            console.error("Error saving people:", error);
        }
    }
}