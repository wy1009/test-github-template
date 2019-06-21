var dels = document.getElementsByClassName('del');

for (var i = 0; i < dels.length; i ++) {
    dels[i].onclick = function (event) {
        var id = this.getAttribute('data-id');
        var tr = document.getElementsByClassName('item-id-' + id)[0];
        var oAjax = new XMLHttpRequest();
        oAjax.open('delete', '/admin/movie/list?id=' + id, true);
        oAjax.send();
        oAjax.onreadystatechange = function () {
            if (oAjax.readyState == 4) {
                if (oAjax.status == 200) {
                    tr.parentNode.removeChild(tr);
                }
            }
        }
    }
}