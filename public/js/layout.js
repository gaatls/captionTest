/**
 * Created by graham on 8/21/16.
 */

var layoutHelpers = {
    addToPage : function(data){
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                let tempDiv = document.createElement('div');
                tempDiv.className="task";
                tempDiv.setAttribute('id', data[i].id);
                let temph2 = document.createElement('h2');
                temph2.appendChild(document.createTextNode(data[i].name));
                tempDiv.appendChild(temph2);
                document.getElementsByTagName('body')[0].appendChild(tempDiv);
            }
        }
    }
};