/*
This file is part of the Zimbra Bulk Reply Zimlet project.
Copyright (C) 2015-2018  Barry de Graaff

Bugs and feedback: https://github.com/Zimbra-Community/bulkreply-zimlet/issues

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see http://www.gnu.org/licenses/.
*/

function tk_barrydegraaff_bulkreply_zimlet_HandlerObject() {
   tk_barrydegraaff_bulkreply_zimlet_HandlerObject.settings = {};
};

tk_barrydegraaff_bulkreply_zimlet_HandlerObject.prototype = new ZmZimletBase();
tk_barrydegraaff_bulkreply_zimlet_HandlerObject.prototype.constructor = tk_barrydegraaff_bulkreply_zimlet_HandlerObject;
var bulkreplyZimlet = tk_barrydegraaff_bulkreply_zimlet_HandlerObject;

bulkreplyZimlet.prototype.init = function () {
   bulkreplyZimlet.version=this._zimletContext.version;
};

/* status method show a Zimbra status message
 * */
bulkreplyZimlet.prototype.status = function(text, type) {
   var transitions = [ ZmToast.FADE_IN, ZmToast.PAUSE, ZmToast.FADE_OUT ];
   appCtxt.getAppController().setStatusMsg(text, type, null, transitions);
}; 

/* Called when the panel is double-clicked.
 */
bulkreplyZimlet.prototype.doubleClicked = function() {
   this.singleClicked();
};

/* Called when the panel is single-clicked.
 */
bulkreplyZimlet.prototype.singleClicked = function() {

};

/* Context menu handler
 * */
bulkreplyZimlet.prototype.menuItemSelected =
function(itemId) {
   var zimletInstance = appCtxt._zimletMgr.getZimletByName('tk_barrydegraaff_bulkreply_zimlet').handlerObject;
   switch (itemId) { 
   case "help":
      window.open(zimletInstance.getResource("/help/index.html"));
      break;
   }
};


/* doDrop handler
 * */
bulkreplyZimlet.prototype.doDrop =
function(zmObjects) {        
   var bccOverride = '';
   /* Single selects result in an object passed,
   Multi selects results in an array of objects passed.
   Always make it an array */    
   if(!zmObjects[0])
   {
   zmObjects = [zmObjects];
   }
   
   zmObjects.forEach(function(zmObject)
   {        
      //if its a conversation i.e. "ZmConv" object, get the first loaded message "ZmMailMsg" object within that.
      if (zmObject.TYPE == "ZmConv") {
         var msgObj = zmObject.srcObj;//get access to source-object
         msgObj  = msgObj.getFirstHotMsg();
         zmObject.participants.forEach(function(address)
         {
            bccOverride = bccOverride + address.address + ', ';
         });
      }
      else
      {
         if (zmObject.srcObj)
         {
            zmObject.srcObj._addrs.FROM._array.forEach(function(address)
            {
               bccOverride = bccOverride + address.address + ', ';
            });
            
            //reply-to is not filled if the message is not yet loaded, this can be avoided by adding code like
            //https://github.com/Zimbra-Community/ca_uoguelph_ccs_archive/commit/7c9113b697d318c51a661d6011baea2ea8b5726e#diff-4d1dc3a69683fc2007fd43561ec59371R595
            //But this is not currently a requirement
            zmObject.srcObj._addrs.REPLY_TO._array.forEach(function(address)
            {
               bccOverride = bccOverride + address.address + ', ';
            });
         }
      }   
   });
     
   var composeController = AjxDispatcher.run("GetComposeController");
   if(composeController) {
      var appCtxt = window.top.appCtxt;
      var zmApp = appCtxt.getApp();
      var newWindow = zmApp != null ? (zmApp._inNewWindow ? true : false) : true;
      var params = {action:ZmOperation.NEW_MESSAGE, inNewWindow:null, composeMode:Dwt.TEXT,
      bccOverride: bccOverride, toOverride:null, subjOverride:null, extraBodyText:null, callback:null}
      composeController.doAction(params); // opens asynchronously the window.
   }     
};
