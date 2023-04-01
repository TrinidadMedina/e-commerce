exports.postSignup =  async (_req, res)=>{
    try{
        res.redirect('/home');
    }catch(err){
       console.error(err)
    } 
};

exports.postLogin =  async (_req, res)=>{
    try{
        res.redirect('/home');
    }catch(err){
       console.error(err)
    } 
};

exports.getSignout =  async (req, res)=>{
    try{
        req.logout(() => {
            res.redirect('/');
        })
    }catch(err){
       console.error(err)
    } 
};