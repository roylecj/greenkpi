Template.charts.rendered = function() {
    chart = {
     target: 'chart1',
     type: 'PieChart',
     columns: [
       ['string', 'Topping'],
       ['number', 'Slices']
     ],
     rows: [
       ['Mushrooms', 3],
       ['Onions', 1],
       ['Olives', 1],
       ['Zucchini', 1],
       ['Pepperoni', 2]
     ],
     options: {
       'title':'How Much Pizza I Ate Last Night',
       'width':700,
       'height':500
     }
   };

   drawChart(chart);

   chart2 = {
    target: 'chart2',
    type: 'ColumnChart',
    columns: [
      ['string', 'Topping'],
      ['number', 'Slices']
    ],
    rows: [
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ],
    options: {
      'title':'How Much Pizza I Ate Last Night',
      'width':700,
      'height':500
    }
  };

  drawChart(chart2);
}
