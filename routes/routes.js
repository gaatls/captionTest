/**
 * Created by graham on 8/19/16.
 */



module.exports = function(app, tlsAsana){
    app.get('/', function (req, res) {
        res.render('layout');
    });

    app.get('/status', function(req, res){
        res.render('layouts/status',
            tlsAsana.getUnassigned().then(function(list){
                return {unassignedList:list};
            })
        );
    });
};