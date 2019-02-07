document.addEventListener('DOMContentLoaded', () => {

	fetch('http://localhost:3000/dogs')
	.then(response => response.json())
	.then(dogs => {
		const table = document.querySelector('table.margin');
		const nameInput = document.querySelector('#dog-form input:nth-child(1)');
		const breedInput = document.querySelector('#dog-form input:nth-child(2)');
		const sexInput = document.querySelector('#dog-form input:nth-child(3)');
		const theForm = document.querySelector('#dog-form');

		function dogsList(dogs){

			dogs.forEach(dog => {
				let row = document.createElement('tr');

				let nameCell = document.createElement('td');
				nameCell.innerText = dog.name;

				let breedCell = document.createElement('td');
				breedCell.innerText = dog.breed;

				let sexCell = document.createElement('td');
				sexCell.innerText = dog.sex;

				let editCell = document.createElement('button');
				editCell.setAttribute('name', `${dog.name}`);
				editCell.setAttribute('value', `${dog.id}`);
				editCell.style.width = "100%";
				editCell.innerText = "Edit Dog";
				editCell.addEventListener("click", (e) => {

					nameInput.value = dog.name;
					breedInput.value = dog.breed;
					sexInput.value = dog.sex;

					if (document.querySelector('.hid')) {
						document.querySelector('.hid').remove();
						let hiddenField = document.createElement('input');
						hiddenField.setAttribute('type', 'hidden');
						hiddenField.setAttribute('name', `dogId`);
						hiddenField.setAttribute('value', `${dog.id}`);
						hiddenField.className = "hid";
						console.log(dog.id);
						theForm.append(hiddenField);
					} else {
						let hiddenField = document.createElement('input');
						hiddenField.setAttribute('type', 'hidden');
						hiddenField.setAttribute('name', `dogId`);
						hiddenField.setAttribute('value', `${dog.id}`);
						hiddenField.className = "hid";
						console.log(dog.id);
						theForm.append(hiddenField);
					}
				})

				row.append(nameCell);
				row.append(breedCell);
				row.append(sexCell);
				row.append(editCell);
				table.append(row);


			})
		}

		// function dogUpdate(dog){
		//
		// }

		dogsList(dogs);

		theForm.addEventListener('submit', (e) => {
			e.preventDefault();

			fetch(`http://localhost:3000/dogs/${e.target.dogId.value}`, {

				method: "PATCH",
				headers: {
					"Content-Type": "application/json"
				},
				body:
					JSON.stringify({
						name: e.target.name.value,
						breed: e.target.breed.value,
						sex: e.target.sex.value
					})




			})
			.then(res => res.json())
			.then(dog => {
				console.log(dog)
			})


		})






	})

})
