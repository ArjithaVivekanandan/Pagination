
var itemCount=prompt("Enter Items per page");

if(itemCount==null||itemCount<=0)
{
itemCount="Invalid input";
document.body.append(itemCount);
}
else{

var pageData,tableData;
var pagerequestData = new XMLHttpRequest();
pagerequestData.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", true);
pagerequestData.send();
pagerequestData.onload = function()
{
     pageData =JSON.parse(this.response);

       tableData=document.createElement("table");
      tableData.setAttribute("style","width:50%;border:1px solid black;border-collapse:collapse")
      var firstRow=document.createElement("tr")
      var serialHead=document.createElement("th")
      serialHead.setAttribute("style","color:Purple;width:2%;border:1px solid black;border-collapse:collapse")
      serialHead.innerHTML="S.No";

      var nameHead=document.createElement("th")
      nameHead.setAttribute("style","color:Purple;width:30%;border:1px solid black;border-collapse:collapse")
      nameHead.innerHTML="Name";

      var emailHead=document.createElement("th")
      emailHead.setAttribute("style","color:Purple;width:%;border:1px solid black;border-collapse:collapse")
      emailHead.innerHTML="Email";

      firstRow.append(serialHead,nameHead,emailHead);
      tableData.append(firstRow);
      document.body.append(tableData);
      
      displayPagedata();
      var breakspace=document.createElement("br");
      var pagination=document.createElement("div");
    
      var firstButton = document.createElement("button");
      firstButton.innerHTML ="First";
      firstButton.onclick="displayPagedata()";

      var previousButton=document.createElement("button");
      previousButton.innerHTML ="Previous";
      previousButton.onclick="displayPagedata()";

      var second=document.createElement("button");
      second.innerHTML ="2";
      second.onclick="displayPagedata()";

      var third=document.createElement("button");
      third.innerHTML ="3";
      third.onclick="displayPagedata()";

      var nextButton=document.createElement("button");
      nextButton.innerHTML ="Next";
      nextButton.onclick="displayPagedata()";

      pagination.append(firstButton,previousButton,second,third,nextButton);
      document.body.append(breakspace,pagination);
    
}
  function displayPagedata(){
    let counter=1;
    for(var d in pageData)
    {
      
      if(counter<=itemCount)
      { 
        var tablerow=document.createElement("tr");

      var serialData=document.createElement('td');
      serialData.setAttribute("style","color:blue;width:2%;border:1px solid black;border-collapse:collapse")
      serialData.innerHTML=pageData[d].id;

      var nameData=document.createElement('td');
      nameData.setAttribute("style","color:blue;width:30%;border:1px solid black;border-collapse:collapse")
      nameData.innerHTML=pageData[d].name;

      var mailData1=document.createElement('td');
      mailData1.setAttribute("style","color:blue;width:68%;border:1px solid black;border-collapse:collapse")
      mailData1.innerHTML=pageData[d].email;
    
    
      tablerow.append(serialData,nameData,mailData1)
      tableData.append(tablerow);
      document.body.append(tableData);
      counter++;
      }
    
    }
  }
}