sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
function (Controller,JSONModel,MessageToast) {
    "use strict";

    return Controller.extend("com.app.project2.controller.View1", {
        onInit: function () {

        },
        onAddButton:function () {
            this.byId("AddDialog").open();
            
        },
        onCancelAdd:function () {
            this.byId("AddDialog").close();
        },
        onSaveAdd:function () {
            debugger
           var Mnum =  this.getView().byId("inputAddSlotno1").getValue(),
                Gwet =  this.getView().byId("inputAddSlotno2").getValue(),
                Nwet = this.getView().byId("inputAddSlotno3").getValue();
                
                
          var Newdata = {
              Matnr : Mnum,
              Brgew   : Gwet,
              Ntgew : Nwet

          };

          var omodel = this.getView().getModel();
          
         


          omodel.create('/SAMPLE_ODATASet', Newdata, {
            success: function () {
                MessageToast.show("Created")
            }.bind(this),
            error: function (error) {
                MessageToast.show("Error" + error.message)
            }
        })
         



        },
        onDelete : function () {
            debugger
          var oSelect =  this.getView().byId("TableId").getSelectedItem().getBindingContext().getPath();
          var oModel = this.getView().getModel();
          oModel.setUseBatch(false);
          oModel.remove(oSelect,{success:function(){
            sap.m.MessageBox.success("Success");  
          },
      error:function(){
          sap.m.MessageBox.error("Error Exist")
      }})
      },
        
      onEdit: function () {
        debugger
        // Get the table control
        var oTable = this.byId("TableId");
        // Get the selected item
        var oSelectedItem = oTable.getSelectedItem();
       

        if (oSelectedItem) {
            var aCells = oSelectedItem.getCells();

            aCells.forEach(function (oCell) {
                var oVBox = oCell;
                var aVBoxItems = oVBox.getItems();

                aVBoxItems.forEach(function (oVBoxItem) {
                    if (oVBoxItem.isA("sap.m.Text")) {
                        oVBoxItem.setVisible(false);
                    } else if (oVBoxItem.isA("sap.m.Input")) {
                        oVBoxItem.setVisible(true);
                    }
                });
            });
            var oButtonchange = this.byId("_IDGenButton3");
            oButtonchange.setText("Submit"),
            oButtonchange.setType("Accept"),
            oButtonchange.detachPress(this.onEdit, this);
            oButtonchange.attachPress(this.onselect, this);

                     
        } else {
            sap.m.MessageToast.show("Please select an item to edit.");
        }
    },

    onselect: function () {
        debugger
        var oSelect =  this.getView().byId("TableId").getSelectedItem().getBindingContext(),
            oPath =  oSelect.getPath(),
            oObject = oSelect.getObject();
            
       
             
            var oModel = this.getView().getModel();

            var oMatnr = this.getView().byId("TableId").getSelectedItem().getCells()[0].getItems()[1].getValue();
            var oBrgew = this.getView().byId("TableId").getSelectedItem().getCells()[1].getItems()[1].getValue();
            var oNtgew = this.getView().byId("TableId").getSelectedItem().getCells()[2].getItems()[1].getValue();

            var Newupdate = {
                Matnr: oMatnr,
                Brgew: oBrgew,
                Ntgew: oNtgew
            };
            oModel.update(oPath, Newupdate, {
                success: function () {
                    MessageToast.show("updated")
                }.bind(this),
                error: function (error) {
                    MessageToast.show("Error" + error.message)
                }
            })
    }

    
        




    });
});
