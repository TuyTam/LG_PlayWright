
import { PersonRepository } from "./PersonRepository.js";


async function main() {
    const repository = new PersonRepository();
    const people = await repository.loadPeople();
    if (people.length === 0) {
        console.log("No people loaded.");
        return;
    }
    people.forEach(person => {
        console.log(person.greet());
        console.log("Is adult:", person.isAdult());
        console.log("---");
    });
    await repository.savePeople(people);
}

main().catch(err => console.error("Error in main:", err));