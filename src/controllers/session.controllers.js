exports.getSignout =  async (req, res, next)=>{
    try{
        req.logout(() => {
            res.redirect('/');
        })
    }catch(err){
       next(err)
    } 
};

