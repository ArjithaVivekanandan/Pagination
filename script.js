var itemCount=prompt("Enter Items per page");
var pageData,tableData;
var init=0;

if(itemCount==null||itemCount<=0)
{
itemCount="Invalid input";
document.body.append(itemCount);
}
else{

var pagerequestData = new XMLHttpRequest();
pagerequestData.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", true);
pagerequestData.send();
pagerequestData.onload = function()
{
     pageData =JSON.parse(pagerequestData.response);
         
     generateData(itemCount,0);
     generateButtons();
     
}

var container=document.createElement("div");
container.setAttribute("class","container");

var title=document.createElement("h1");
title.setAttribute("class","text-warning text-center");
title.innerHTML="Pagination";

tableData=document.createElement("table");
tableData.setAttribute("style","width:100%");
tableData.setAttribute("class","table table-bordered");


var buttonRow=document.createElement("div");
buttonRow.setAttribute("class"," buttonCollection btn-group-sm");

container.append(title,tableData,buttonRow);
document.body.append(container);       

  function generateData(itemCount,pageNumber)
  {
    tableData.innerHTML="";
    var start=pageNumber*itemCount;
    var end=(start+ +itemCount);

    var firstRow=document.createElement("tr")
    var serialHead=document.createElement("th")
    serialHead.setAttribute("style","width:2%")
    serialHead.setAttribute("class","text-danger")
    serialHead.innerHTML="S.No";

    var nameHead=document.createElement("th")
    nameHead.setAttribute("style","width:30%")
    nameHead.setAttribute("class","text-danger")
    nameHead.innerHTML="Name";

    var emailHead=document.createElement("th")
    emailHead.setAttribute("style","width:68%")
    emailHead.setAttribute("class","text-danger")
    emailHead.innerHTML="Email";

    firstRow.append(serialHead,nameHead,emailHead);
    tableData.append(firstRow);
   
    for(var d=start;d<end;d++)
    {
      
      var tablerow=document.createElement("tr");

      var serialData=document.createElement('td');
      serialData.setAttribute("style","width:2%")
      serialData.setAttribute("class","text-success small");
      serialData.innerHTML=pageData[d].id;

      var nameData=document.createElement('td');
      nameData.setAttribute("style","width:30%")
      nameData.setAttribute("class","text-success small");
      nameData.innerHTML=pageData[d].name;

      var mailData=document.createElement('td');
      mailData.setAttribute("style","width:68%")
      mailData.setAttribute("class","text-success small");
      mailData.innerHTML=pageData[d].email;
    
    
      tablerow.append(serialData,nameData,mailData)   
      tableData.append(tablerow);
    }
  }


  function generateButtons(){

    
      var buttonCount=parseInt(100/(itemCount));
      if(100 % itemCount!=0)
      buttonCount++;

      for(let i=1;i<=buttonCount;i++){
        
        var button=document.createElement("button");
        button.setAttribute('class', 'btn btn-outline-primary');
        button.innerHTML=i;
        
          if(i==1){
          
          button.innerHTML="First";
          button.setAttribute('class', 'btn btn-outline-primary active');
        }
         if(i==buttonCount)
        {
          button.innerHTML="Last";
        }
         document.body.append(button);
         button.onclick=(event)=>{
          generateData(itemCount,i-1)
  
          var currentActive = document.getElementsByClassName("active");
              currentActive[0].className = currentActive[0].className.replace(" active", "");
              
    
              event.target.className += " active";
          };
          buttonRow.append(button);
      }
      }
    }
