import axios from "axios";

const getData = async () => {
	const data = await axios.get("./assets/data").then((res) => res.data);
	return data;
};

const filterByGroupName = async (name) => {
	const response = await getData();

	const groupByCategory = {
		[name]: response
			.filter((x) => x.group == name)
			.reduce((finalObject, person) => {
				const { type } = person;

				if (type == "assistant") {
					finalObject[type] = person.name;
				} else {
					finalObject["student"] = finalObject["student"] ?? [];
					finalObject["student"].push(person.name);
				}

				return finalObject;
			}, {}),
	};

	console.log(groupByCategory);
	return response;
};

filterByGroupName("YellowGreen");
