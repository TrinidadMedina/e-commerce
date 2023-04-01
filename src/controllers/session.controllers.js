exports.getSignout =  async (req, res)=>{
    try{
        req.logout(() => {
            res.redirect('/');
        })
    }catch(err){
       console.error(err)
    } 
};