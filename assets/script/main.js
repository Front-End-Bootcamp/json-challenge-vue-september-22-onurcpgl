// Fetch işlemini axios kullanarak yapacağımız için axiosu import ettik.
import axios from "axios";


// Tüm datayı getData isimli fonksiyon ile çektik verileri bu fonksiyonu çağırarak kullanacağız.
const getData = async () => {
	const data = await axios.get("./assets/data").then((res) => res.data);
	return data;
};

const filterByGroupName = async (name) => {
	const response = await getData();

	//Filtreleme işlemini yaptık.
	const groupByCategory = {
		// Fonksiyona gelene name parametresini burada kullandık.
		[name]: response
			.filter((x) => x.group == name) // Filter ile gelen verilerin group isimlerini gelen name değişkenindeki name eşit mi bakıyoruz.
			.reduce((finalObject, person) => { 
				const { type } = person;

				if (type == "assistant") {// person içinden gelen type asistant mı kontrolu.
					finalObject[type] = person.name; // öyle ise asistanın ismini yazdırdık asistant içine.
				} else {
					finalObject["student"] = finalObject["student"] ?? []; // değilse öğrencilerin ismini student altına yazdırdık.
					finalObject["student"].push(person.name);
				}

				return finalObject;
			}, {}),
	};

	console.log(groupByCategory); //fonskiyonu logladık..
	return response;
};

// Bu şekilde çağıralarakda konsola yazdırılabilir.
filterByGroupName("YellowGreen");
// Yada bu şekilde konsola yazdırılabilir.
const result=filterByGroupName("YellowGreen");
console.log(result);
