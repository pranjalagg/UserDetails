var userData

const url = 'https://5w05g4ddb1.execute-api.ap-south-1.amazonaws.com/dev/profile/listAll'

fetch(url)
	.then(res => res.json())
	.then((d) => {
		userData = d.list
		removeLoading()
	})
	.catch(err => console.log('Error: ' + err))


function removeLoading() {
	let loading = document.getElementById('loading')
	document.getElementById('button').disabled = false

	loading.remove()
}

function generateTHead(table) {
	headings = ['Name', 'Pic', 'Gender', 'Date', 'Status']

	let thead = table.createTHead();
	let row = thead.insertRow();
	for (let head of headings) {
		let th = document.createElement('th')
		let text = document.createTextNode(head)
		th.appendChild(text);
		row.appendChild(th);
	}

}


function createTable(table) {
	for (let user of userData) {
		let row = table.insertRow();
		row.setAttribute('class', 'User')

		for (key in user) {
			if (key === 'img') {
				let cell = row.insertCell()
				let link = document.createElement('img')
				link.setAttribute('src', user[key])
				link.setAttribute('id', 'prof_pic')
				cell.appendChild(link)
			}

			if (key === 'name' || key === 'gender' || key === 'date' || key === 'status')
			{
				let cell = row.insertCell();
				let text = document.createTextNode(user[key]);
				cell.appendChild(text)
			}
		}
	}
	generateTHead(table)
}

function updateTable() {
	// document.querySelector("#unsorted tbody").remove();
	// // document.querySelector("#unsorted thead").remove();
	// tbl = document.getElementById('unsorted')
	var tbl = document.getElementById("unsorted");
	tbl.innerHTML = "";
	createTable(tbl)


}

function convertDate(date) {
	var split = date.split("/");
	return (split[2] + split[1] + split[0]);
}

function sortUsers() {
	userData.sort(function(a, b) {
		if (a.status == b.status) {
			return (convertDate(a.date) > convertDate(b.date)) ? 1 : -1
		}
		return (a.status > b.status) ? 1 : -1
	})

	updateTable()
	let sortButton = document.getElementsByTagName('button')[0]
	sortButton.remove()

	// console.log(userData)

}

function generateTable() {
	let body = document.getElementsByTagName('body')[0]

	let table = document.createElement('table')

	createTable(table)
	// generateTHead(table)
	table.setAttribute('id', 'unsorted')

	let firstButton = document.getElementById('button')
	firstButton.remove()

	let sortButton = document.createElement('button')
	let sortButtonText = document.createTextNode('Sort')
	sortButton.setAttribute('onclick', 'sortUsers()')
	sortButton.setAttribute('id', 'button')

	sortButton.appendChild(sortButtonText)

	body.appendChild(table)
	body.appendChild(sortButton)

}