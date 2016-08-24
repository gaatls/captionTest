/**
 * Created by graham on 8/21/16.
 *
 * A series of functions to help create the layout of the page and the behavior associated with the layout
 */

var layoutHelpers = {

    expandHeight : '600px',
    collapseHeight : '45px',
    /**
     * Creates a visual representation of the task and adds it to the page
     *
     * @param data {Object} An object representing the task that should be added to the page.
     */
    addToPage : function(data){
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let tempDiv = document.createElement('div');
                tempDiv.className="task";
                tempDiv.setAttribute('id', data[i].id);
                let temph2 = document.createElement('h2');
                temph2.appendChild(document.createTextNode(data[i].name));
                tempDiv.appendChild(temph2);
                let contentDiv = document.createElement('div');
                contentDiv.className="content";
                tempDiv.appendChild(contentDiv);
                tempDiv.onclick=function(){layoutHelpers.expandView(data[i].id)};
                document.getElementsByTagName('body')[0].appendChild(tempDiv);
            }
        }
    },

    /**
     * Expands the view of a specific task
     *
     * @param which {string} The id number of the task that should be expanded
     */
    expandView : function(which){
        $('#'+which).animate({
            height:layoutHelpers.expandHeight
        }, sendMessage('taskInfoQueryEvent', {id:which}));
        this.collapseView( document.getElementsByClassName('task') );
    },

    /**
     * Moves through each task on the page and collapses them down into their default state if needed
     *
     * @param classArray {Array} An array of DOM elements to walk through and collapse down
     */
    collapseView : function(classArray){
        for(var i=0; i<classArray.length; i++){
            if(classArray[i].style.height == layoutHelpers.expandHeight){
                $('#'+classArray[i].id+ '>.content').fadeOut(400, function(){
                    $(this).html('');
                });
                $('#'+classArray[i].id).animate({height:layoutHelpers.collapseHeight});
            }
        }
    },

    /**
     * Fetches the content for a specific task and places it on the page for layout purposes
     *
     * @param data {Object} An Object representing all of the information about this task
     */
    placeContent : function(data){
        var tempDiv = document.createElement('div');
        tempDiv.className = "contentInfo";
        var home = document.getElementById(data.id);
        home.getElementsByClassName('content')[0].appendChild(tempDiv);

        var created = document.createElement('h2');
        created.appendChild( document.createTextNode("Creation: " + data.created_at) );
        tempDiv.appendChild(created);

        var due = document.createElement('h2');
        due.appendChild( document.createTextNode("Due Date: " + data.due_at) );
        tempDiv.appendChild(due);

        tempDiv.classList.add('visible');
    }

};