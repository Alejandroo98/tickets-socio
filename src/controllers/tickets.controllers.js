ticketController = {}


ticketController.getIndex=(_req,res)=>{
  res.render('reserves/index-ticket')
}

module.exports = ticketController;
