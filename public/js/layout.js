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
                tempDiv.appendChild(this.createHeader(data[i].name));
                let contentDiv = document.createElement('div');
                contentDiv.className="content";
                tempDiv.appendChild(contentDiv);
                tempDiv.onclick=function(){layoutHelpers.expandView(data[i].id)};
                document.getElementsByTagName('body')[0].appendChild(tempDiv);
            }
        }
    },

    /**
     * Creates the header row for the task including mouseover behavior, title placement, etc.
     *
     * @param taskName {String} The name for this header
     */
    createHeader : function(taskName){
        let headerDiv = document.createElement('div');
        headerDiv.className = "headerDiv";
        let temph2 = document.createElement('h2');
        temph2.className = "contentTitle";
        temph2.appendChild(document.createTextNode(taskName));
        headerDiv.appendChild(temph2);
        return headerDiv;

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
        console.dir(data);
        var tempDiv = document.createElement('div');
        tempDiv.className = "contentInfo";
        var home = document.getElementById(data.id);
        home.getElementsByClassName('content')[0].appendChild(tempDiv);

        if(data.created_at) {
            tempDiv.appendChild(this.createContentPiece(false, 'Creation: ', data.created_at));
        }
        if(data.due_at !== null) {
            tempDiv.appendChild(this.createContentPiece(false, 'Due Date: ', data.due_at));
        }
        if(data.notes !== null){
            tempDiv.appendChild(this.createContentPiece(true, 'Notes:'));
            var pele = document.createElement('p');
            pele.appendChild(document.createTextNode(data.notes));
            tempDiv.appendChild(pele);
        }

        tempDiv.classList.add('visible');
    },

    /**
     * Creates the title and value in a way that can be easily styled with CSS. This should be used to create all
     * of the pieces of information for the front end that are drawn in from Asana
     *
     * @param titleOnly {boolean} If true this will only generate and return an appropriately formatted title, otherwise
     *        it will generate a title and some information after the title
     * @param title {string} The title that will be displayed next to this content piece
     * @param [data] {string} The data that  will be displayed next to the title
     */

    createContentPiece : function(titleOnly, title, data){
        data = (typeof(data) === 'undefined') ? undefined : data;

        var retEle = document.createElement('h2');
        var titleStyle = document.createElement('span');
        titleStyle.className = "heading";
        titleStyle.appendChild(document.createTextNode(title));
        retEle.appendChild(titleStyle);

        if(data !== undefined) {
            retEle.appendChild(document.createTextNode(data));
        }
        return retEle;
    }

};