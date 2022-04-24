function index(req,res){
    if(req.session.loggedin == true){
        req.getConnection((err,conn) =>{
            conn.query('SELECT * FROM task', (err,task) =>{
                if(err){
                    res.json(err);
                }
                res.render('task/index', {task});
            })
        })
        
    }else{
        res.redirect('/login');
    }
}

function create(req,res){
    if(req.session.loggedin == true){
        res.render('task/create' );
    }else{
        res.redirect('/login');
    }
}

function store(req,res){
    
    const data = req.body;
    req.getConnection((err,conn) =>{
        conn.query('INSERT INTO task SET ?', [data], (err,rows)=>{
            res.redirect('/datos');
        });
    });
}

function destroy (req,res){
    const id =req.body.id;
    req.getConnection((err,conn) => { 
        conn.query('DELETE FROM task WHERE id =?', [id] , (err,rows) =>{
            res.redirect('/datos');
        });
    });
}

function edit (req,res) {
    if(req.session.loggedin == true){
        const id = req.params.id;
        req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM task WHERE id = ?',[id], (err,task) =>{
            if(err){
                res.json(err);
            }
            res.render('task/edit', {task});
        });
    });
        
    }else{
        res.redirect('/login');
    }
}

function update (req,res){
    const id = req.params.id;
    const data = req.body;
    req.getConnection((err,conn) => {
        conn.query('UPDATE task SET ? WHERE id= ? ', [data,id], (err,rows) => {
            res.redirect('/datos')
        })
    })
}

module.exports = {
    index: index,
    create: create,
    store:store,
    destroy:destroy,
    edit:edit,
    update:update
}