var itemCount;
var pageData,tableData;
var init=0;
var container=document.createElement("div");
container.setAttribute("class","container");
container.setAttribute("style","font-family: 'Akaya Telivigala', cursive;")

var title=document.createElement("h1");
title.setAttribute("class","text-danger text-center");
title.innerHTML="Pagination";

var introMsg =document.createElement("div")
introMsg.setAttribute("class","text-primary");
introMsg.innerHTML="How many items per page needs to be displayed?"

var inputfield=document.createElement("input");
inputfield.setAttribute("type","text");
inputfield.setAttribute("class","text-muted")

var errorMsg =document.createElement("div")
errorMsg.setAttribute("class","text-danger");


tableData=document.createElement("table");
tableData.setAttribute("class","table table-dark");


var buttonRow=document.createElement("div");
buttonRow.setAttribute("class"," buttonCollection btn-group-sm");

container.append(title,introMsg,inputfield,errorMsg,tableData,buttonRow);
document.body.append(container);  

inputfield.onkeyup=(e)=>{
  
itemCount=e.target.value;
  workingME(itemCount);
}

function workingME(itemCount)
{
 if(itemCount>0){
errorMsg.innerHTML="";
var pagerequestData = new XMLHttpRequest();
pagerequestData.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", true);
pagerequestData.send();
pagerequestData.onload = function()
{
     pageData =JSON.parse(pagerequestData.response);
         
     generateData(itemCount,0);
     generateButtons();
     
}
}
else
  {
    tableData.innerHTML="";
    buttonRow.innerHTML="";
    errorMsg.innerHTML="Please provide valid Input!!!";
    
  }
   
  function generateData(itemCount,pageNumber)
  {
    
    tableData.innerHTML="";
    buttonRow.innerHTML="";
    var start=pageNumber*itemCount;
    var end=(start+ +itemCount);

    var firstRow=document.createElement("tr")
    var serialHead=document.createElement("th")
  
    serialHead.setAttribute("class","text-warning")
    serialHead.innerHTML="S.No";

    var nameHead=document.createElement("th")
    nameHead.setAttribute("class","text-warning")
    nameHead.innerHTML="Name";

    var emailHead=document.createElement("th")
    emailHead.setAttribute("class","text-warning")
    emailHead.innerHTML="Email";

    firstRow.append(serialHead,nameHead,emailHead);
    tableData.append(firstRow);
   
    for(var d=start;d<end;d++)
    {
      
      var tablerow=document.createElement("tr");

      var serialData=document.createElement('td');
      serialData.setAttribute("class","text-white small");
      serialData.innerHTML=pageData[d].id;

      var nameData=document.createElement('td');
      nameData.setAttribute("class","text-white small");
      nameData.innerHTML=pageData[d].name;

      var mailData=document.createElement('td');
      mailData.setAttribute("class","text-white small");
      mailData.innerHTML=pageData[d].email;
    
    
      tablerow.append(serialData,nameData,mailData)   
      tableData.append(tablerow);
    }
  }


  function generateButtons()
  {
    buttonRow.innerHTML="";
      var buttonCount=parseInt(100/(itemCount));
      if(100 % itemCount!=0)
      buttonCount++;

        for(let i=1;i<=buttonCount;i++)
        {
      
          var button=document.createElement("button");
          button.setAttribute('class', 'btn btn-outline-primary');
          button.innerHTML=i;
        
          if(i==1)
          {
          
          button.innerHTML="First";
          button.setAttribute('class', 'btn btn-outline-primary active');
          }
          if(i==buttonCount)
          {
          button.innerHTML="Last";
          }
          document.body.append(button);
          button.onclick=(event)=>
          {
          generateData(itemCount,i-1)
  
          var currentActive = document.getElementsByClassName("active");
          currentActive[0].className = currentActive[0].className.replace(" active", "");
          event.target.className += " active";
          };
          buttonRow.append(button);
        }
        
  }
}
