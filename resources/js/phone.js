var phoneController = (function() {
    
    
    var setupButtons = function() {
        
        //Display the 'new device form'
        document.querySelector('.add-btn').addEventListener('click', function() {
                document.querySelector('.table').style.display = 'none';
                document.querySelector('.item-form').style.display = 'block';
            });

        //Hide the 'new device form' without save
        document.querySelector('.cancel-btn').addEventListener('click', function() {
                document.querySelector('.table').style.display = 'block';
                document.querySelector('.item-form').style.display = 'none';
            });
        
        //Save a new phone
        document.getElementById('submit').addEventListener('click', function() {
            httpService.savePhone(phoneController.extractDeviceFromForm(), phoneController.refresh); //this.refresh!
        });
        
    };
    
    
    var loadDataTablePage = function() {
        
        var pageParts, page;
        pageParts = location.search.split('page=');
        page = pageParts.length > 1 ? pageParts[1] : 1;
        
        httpService.requestTableData({'page':page, 'size': 10, 'sortMap': {'id':'DESC'}}, phoneController.fillTableWithData);
        
    };
    
    
    var Phone = function(form) {
        
        var elements = form.elements;
        var obj ={};
        for (var i = 0; i < elements.length; i++) {
            var item = elements.item(i);
            obj[item.name] = item.value;
        }
        
        return obj;
         
    };
    
    
    return {
        
        init: function() {
            setupButtons();
            loadDataTablePage(); 
        },
        
        
        refresh: function() {
            
            document.querySelector('.device-list').innerHTML = '';
            document.querySelector('.pages').innerHTML = '';
            
            loadDataTablePage();
        },
        
        
        fillTableWithData: function() { //(response)
                    
            var newHtml, numOfDevices, numOfPages, html;

            html = '<tr id="%deviceID%" data="%id%"><td id="%deviceName%"><p onclick="phoneController.updateFormHandler(%id%)">%name%</p></td><td class="device-type"><p>%type%</p></td><td class="device-expert-rate"><p>6</p></td><td class="device-system"><p>%system%</p></td><td class="device-RAM"><p>%ram% GB</p></td><td class="device-processor"><p>%processor%</p></td><td class="device-camera"><p>%camera% MP</p></td><td class="device-battery"><p>%battery% mAh</p></td><td class="device-screen"><p>%screen%"</p></td><td class="device-price"><p>%price% Ft</p></td><td class="device-create"><p>%create%</p></td><td class="device-update"><p>%update%</p></td><td id="%trash%" class="trash-icon"><i onclick="phoneController.deleteDeviceHandler(%id%)" class="ion-ios-trash-outline"></i></td></tr>'; 
            

            for (var i = 0; i < this.content.length; i++) { //response.content.lenght
                //Replace the placeholder text with some actual data
                newHtml = html.replace('%deviceID%', "device-" + i);
                newHtml = newHtml.replace('%deviceName%', "name-" + i);
                newHtml = newHtml.replace(/%id%/g, this.content[i].id);
                newHtml = newHtml.replace('%name%', this.content[i].name);
                newHtml = newHtml.replace('%type%', this.content[i].category);
                newHtml = newHtml.replace('%system%', this.content[i].operatingSystem);
                newHtml = newHtml.replace('%ram%', this.content[i].memory);
                newHtml = newHtml.replace('%processor%', this.content[i].processor);
                newHtml = newHtml.replace('%camera%', this.content[i].camera);
                newHtml = newHtml.replace('%battery%', this.content[i].battery);
                newHtml = newHtml.replace('%screen%', this.content[i].screen);
                newHtml = newHtml.replace('%price%', this.content[i].price);
                newHtml = newHtml.replace('%create%', this.content[i].createdAt);
                newHtml = newHtml.replace('%update%', this.content[i].updatedAt);
                newHtml = newHtml.replace('%trash%', "trash-" + i);
                
                //Insert the HTML into the DOM
                document.querySelector(".device-list").insertAdjacentHTML('beforeend', newHtml);

            }
            
            //Insert the num of total devices
            numOfDevices = this.totalElements;
            document.querySelector(".total-devices").textContent = numOfDevices;
            
            //display the page navigation if it neccessary
            if (numOfDevices > 10) {
                document.querySelector(".pages").style.display = 'block';
            }
            
            
            numOfPages = Math.ceil(numOfDevices / 10);
            for (i = 1; i <= numOfPages; i++) {
                document.querySelector(".pages").insertAdjacentHTML('beforeend', '<li id="page-' + i + '"><a href="?page='+ i +'">' + i + '</a></li>');
            }
            
            
            if (location.search.split()[0].startsWith('?page=')) {
                var pageParts = location.search.split('page=');
                document.getElementById('page-' + pageParts[1]).classList.add('active'); 
            } else {
                document.getElementById('page-1').classList.add('active');
            }
              
        },
        
        
        deleteDeviceHandler: function(id) {
             httpService.deleteDevice(id, this.refresh);
        },
        
        
        updateFormHandler: function(id) {
            
            document.querySelector(".table").style.display = 'none';
            document.querySelector(".item-form").style.display = 'block';
            document.getElementById('submit').style.display = 'none';
            document.getElementById('update').style.display = 'block';
            
            httpService.loadPhone(id, phoneController.fillForm);
                    
            document.getElementById('update').addEventListener('click', function() {
                var dev = {};
                dev = phoneController.extractDeviceFromForm();
                dev.id = id;
                
                httpService.updatePhone(dev, phoneController.refresh);
            });
              
        },
        
        fillForm: function() {
            
            document.getElementById('name').value = this.name;
            document.getElementById('category').value = this.category;
            //The server doesn't store the expert's rate
            //document.getElementById('expert').value = this.name;
            document.getElementById('operatingSystem').value = this.operatingSystem;
            document.getElementById('memory').value = this.memory;
            document.getElementById('processor').value = this.processor;
            document.getElementById('camera').value = this.camera;
            document.getElementById('battery').value = this.battery;
            //The server don't store the device spec: 'storage'
            //document.getElementById('storage').value = this.memory;
            document.getElementById('screen').value = this.screen;
            document.getElementById('price').value = this.price;
            document.getElementById('photo').value = this.photo;
            document.getElementById('description').value = this.description;  
        
        },
               
        extractDeviceFromForm: function() {
            return new Phone(document.querySelector('.new-device-form'));
        },
       
    };
    
})();


phoneController.init();































