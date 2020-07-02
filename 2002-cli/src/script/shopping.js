$(function(){
   $.ajax({
    url: '../api/data.json',
    type: 'get',
    data: 'type=3',
    dataType: 'json',
    success: function (json){
        $.each(json,function (index,item){
            var goodsDom = `
                    <li>
                   <a href='http://127.0.0.1:5500/2002-cli/dist/html/details.html'><img src="${item.imgurl}" alt=""></a>
                    <p>${item.title}</p>
                    <span>${item.price}</span>
                    <button>加入购物车</button>
                    </li>
            `;
            $('.shoppingList ul').append(goodsDom);
        })
    }
})
})
$(".footer").load("footer.html");