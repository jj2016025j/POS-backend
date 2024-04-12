(function() {
    // $.get("/business", function(data) {
            
    // })

    // const data = [
    //     { month: "1月", price: 10 },
    //     { month: "2月", price: 20 },
    //     { month: "3月", price: 15 },
    //     { month: "4月", price: 25 },
    //     { month: "5月", price: 22 },
    //     { month: "6月", price: 30 },
    //     { month: "7月", price: 28 },
    //     { month: "8月", price: 28 },
    //     { month: "9月", price: 100 },
    //     { month: "10月", price: 3 },
    //     { month: "11月", price: 22 },
    //     { month: "12月", price: 10 },
    // ];

    //get previous 12 months
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let data = [];
    for (let i = 0; i < 12; i++) {
        if (month === 0) {
            month = 12;
            year -= 1;
        }
        var priceItem = turnoverByYearAndMonth.find((x) => x.year === year && x.month === month);
        data.push({ month: `${year}年${month}月`, price: priceItem ? priceItem.price : 0 });
        month -= 1;
    }
    data.reverse();

    new Chart(
        document.getElementById('bar-chart-content'),
        {
        type: 'bar',
        data: {
            labels: data.map(row => row.month),
            datasets: [
                {
                    label: '月營業額',
                    data: data.map(row => row.price),
                    // backgroundColor: [
                    //     'rgba(255, 99, 132, 0.2)',
                    //     'rgba(255, 159, 64, 0.2)',
                    //     'rgba(255, 205, 86, 0.2)',
                    //     'rgba(75, 192, 192, 0.2)',
                    //     'rgba(54, 162, 235, 0.2)',
                    //     'rgba(153, 102, 255, 0.2)',
                    //     'rgba(201, 203, 207, 0.2)'
                    // ],
                    // borderColor: [
                    //     'rgb(255, 99, 132)',
                    //     'rgb(255, 159, 64)',
                    //     'rgb(255, 205, 86)',
                    //     'rgb(75, 192, 192)',
                    //     'rgb(54, 162, 235)',
                    //     'rgb(153, 102, 255)',
                    //     'rgb(201, 203, 207)'
                    // ],
                    borderWidth: 1
                }]
            }
        }
    );
})();

// let getDayTurnover = () => {
//     let dayTurnover = document.getElementById("day-turnover");
//     $.get("/business", function(data) {
//         dayTurnover.innerHTML = data;
//     })
// }
// getDayTurnover();

// let getMonthTurnover = () => {
//     let monthTurnover = document.getElementById("month-turnover");
//     $.get("/business", function(data) {
//         monthTurnover.innerHTML = data;
//     })
// }
// getMonthTurnover();

// let getRank = () => {
//     let salesRankingItem = document.querySelectorAll(".sales-ranking-item");
//     let salesRankingQuantity = document.querySelectorAll(".sales-ranking-quantity");
    
//     $.get("/business", function(data) {
//         for (let i = 0; i < salesRankingItem.length; i++) {
//             salesRankingItem[i].innerHTML = data[i];
//             salesRankingQuantity[i].innerHTML = data[i];
//         }
//     })
// }
// getRank();