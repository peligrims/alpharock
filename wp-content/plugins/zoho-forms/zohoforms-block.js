

var wpElem = wp.element;
var wpCreateElem = wpElem.createElement;
var favIcon = wpCreateElem("img", {
  src: zohoFormsBlock.favIconPath,
  alt: "Zoho Forms"
});
var backSvgIcon = wpCreateElem('svg', null,
    wpCreateElem('path', { d: "M21 11.016v1.969h-14.156l3.563 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.563 3.609h14.156z"} )
    );
wp.blocks.registerBlockType('zoho/zoho-forms',{
	title: 'Zoho Forms',
  	icon: favIcon,
  	category: 'embed',
  	attributes: {
    	zf_short_code: {type: 'string'},
    	formPerma: {type: 'string'},
    	height: {type: 'string'},
    	width: {type: 'string'},
  	},
  	edit:function (props){
  		//if form already embed 
  		var zformsShortCode = props.attributes.zf_short_code;
  		if(zformsShortCode !=undefined && zformsShortCode.length!=0){
  			return wpCreateElem("div", 
  						null,
  						wpCreateElem("iframe",
  							{allowtransparency: "true",scrolling: "auto",src: props.attributes.formPerma,width: props.attributes.width,height: props.attributes.height,frameborder:"0"}
  						)
  					)
  		}

  		//to go to home 
  		function goToHomeDiv(){
  			$("#formPermaLinkPasteDiv").hide();
  			$("#chooseZohoFormDiv").hide();
  			$("#zfHomeDiv").show();
  		}

  		//hide perma link error
  		function hideError(){
  			var permaLinkErrElem = $('#permaLinkError');
  			$(permaLinkErrElem).parent().removeClass("zf-wb-errorCont");
  			$(permaLinkErrElem).hide();
  		}
  		//embed form threw perma URL
  		function zf_block_embed(){
  			var formPerma = $("#permalink").val();
  			if(formPerma.length==0){
  				var permaLinkErrElem = $('#permaLinkError');
  				$(permaLinkErrElem).parent().addClass("zf-wb-errorCont");
  				$(permaLinkErrElem).show();
  				return;
  			}
  			var height = $("#formHeight").val();
  			var width = $("#formWidth").val();
  			if(height == ""){
  				height = '600px';
  			}
  			if(width == ""){
  				width= '100%';
  			}
  			saveShortCode(formPerma,width,height);
  		}
  		//form select error
  		function hideFormSelectError(){
  			var formSelectError = $("#formSelectError");
  			$(formSelectError).parent().removeClass("zf-wb-errorCont");
  			$(formSelectError).hide();
  		}
  		//embed form threw selecting from list
  		function zf_choose_form_embed(){
  			var formPerma = $("#zf_formslist").val();
  			if(formPerma.length==0 || formPerma =="-select-"){
  				var formSelectError = $("#formSelectError");
  				$(formSelectError).parent().addClass("zf-wb-errorCont");
  				$(formSelectError).show();
  				return;
  			}
  			var height = $("#zformHeight").val();
  			var width = $("#zformWidth").val();
  			if(height == ""){
  				height = '600px';
  			}
  			if(width == ""){
  				width= '100%';
  			}
  			saveShortCode(formPerma,width,height);
  		}
  		//saving shotcode and rendering the form
  		function saveShortCode(formPerma,width,height){
  			var shortCode="[zohoForms src="+formPerma+" width="+width+" height="+height+"]";
  			var iframe = wpCreateElem("iframe",{allowtransparency: "true",scrolling: "auto",src: formPerma,width: width,height: height,frameborder:"0"});
  			props.setAttributes({zf_short_code:shortCode});
  			props.setAttributes({formPerma:formPerma});
  			props.setAttributes({height:height});
  			props.setAttributes({width:width});
  			$("#formPermaLinkPasteDiv").hide();
  			$("#blockEditShortCodeDiv").html(iframe);
  			$("#blockEditShortCodeDiv").show();
  		}
  		//while choosing embed form threw perma url
  		function embedPerma(){
  			hideError();
  			$("#zfHomeDiv").hide();
			$("#chooseZohoFormDiv").hide();
  			$("#formPermaLinkPasteDiv").show();
  			$("#permalink").focus();
  		}
  		//while choosing embed form threw formslist
  		function chooseForm(){
  			hideFormSelectError();
  			hideDomainError();
  			$("#zfHomeDiv").hide();
  			$("#formPermaLinkPasteDiv").hide();
  			$("#chooseZohoFormDiv").show();
  			if(typeof a =="undefined" || a == ""){
				$("#zDomaindiv").show();
		  		$("#zFormSelectDiv").hide();	
		  		$("#zfRefreshDiv").hide();
	  			$("#zfCreateFormDiv").hide();
  			}
  		}
  		//Getting zoho forms and adding to list
  		function getZohoForms(){
  			$("#zfRefreshDiv").hide();
  			var newScript = document.createElement("script");
			var inlineScript = document.createTextNode("var a='';");
			newScript.appendChild(inlineScript); 
			document.getElementsByTagName("head")[0].appendChild(newScript);
  			var domain = $("#zf_domain").val();
  			if(domain != undefined && domain.length != 0 && domain != "-select-"){
	  			var zohoFormsURL = getZohoFormsURL(domain);
	  			resetFormsList();
	  			if(zohoFormsURL != ""){
	  				$("#zDomaindiv").hide();
	  				getZohoFormsList(zohoFormsURL);
	  			}else{
	  				$("#zFormSelectDiv").hide();
	  				//$("#zFsigninDiv").hide();
	  				$("#zfRefreshDiv").hide();
	  				$("#zfCreateFormDiv").hide();
	  			}
  			}else{
  				var domainError = $("#domainErr");
  				$(domainError).parent().addClass("zf-wb-errorCont");
  				$(domainError).show();
  			}
  		}
  		//hide Domain Error
  		function hideDomainError(){
  			var domainError = $("#domainErr");
  			$(domainError).parent().removeClass("zf-wb-errorCont");
  			$(domainError).hide();
  		}
  		//reset forms list
  		function resetFormsList(){
  			hideFormSelectError();
  			$('#zf_formslist').find('option').remove();
  			$('#zf_formslist').append("<option value='-select-'>-Select-</option>");
  		}
  		//constructing url based on domain extention
  		function getZohoFormsURL(domain){
  			if(domain != undefined && domain.length != 0 && domain != "-select-"){
  				return "https://forms.zoho"+domain;
  			}else{
  				return "";
  			}
  		}
  		//calling api and adding to dropdown
  		function getZohoFormsList(formsUrl){
  			var apiURL = formsUrl+"/api/getforms?type=plugin";
  			$("#loadingDiv").show();
  			getFormsAndIncludeScript(apiURL,addToFormListDropDown);
  		}
  		function getFormsAndIncludeScript(url,callback)
		{
		    var script = document.createElement("script")
		    script.type = "text/javascript";
		    if (script.readyState)
		    {  
			//IE

			script.onreadystatechange = function(){ 		
		            if (script.readyState == "loaded" || script.readyState == "complete")
			    	{
		                script.onreadystatechange = null;
		                callback();
		            }
		        };
		    } 
		    else 
		    {
			//Others
		       script.onload = function(){
		            callback();
		        };
		        script.onerror = function(){
		    		callback();
		    	};
		    }	
		    script.src = url;
		    document.getElementsByTagName("head")[0].appendChild(script);	
		}
  		function addToFormListDropDown(){
  			$("#zfRefreshDiv").hide();
  			$("#zfCreateFormDiv").hide();
  			if(a!=""){
  				var len = a.forms.length;
  				if(len == 0){
  					$("#zfCreateFormDiv").show();
  					$("#zFormSelectDiv").hide();
  				}else{
	  				var formList =document.getElementById("zf_formslist");
	  				for(i = 0; i < len;i++){
	  					var option = document.createElement("option");
						option.text = a.forms[i].display_name;
						option.value = a.forms[i].public_url;
						formList.options.add(option);
	  				}
	  				$("#zFormSelectDiv").show();
  				}
  			}else{
  				$("#zFormSelectDiv").hide();
  				openSigninOrCreateForm();
  			}
  			$("#loadingDiv").hide();
  		}
  		//Redirecting for  signIn or create Form and loading refresh.
  		function openSigninOrCreateForm(){
  			var domain = $("#zf_domain").val();
  			var zohoFormsURL = getZohoFormsURL(domain);
  			if(zohoFormsURL !=""){
  				window.open(zohoFormsURL);
  				$("#zfCreateFormDiv").hide();
  				$("#zfRefreshDiv").show();
  			}
  		}
  		//creating html elements
  		var domainDropDownElem = wpCreateElem("div",
		    						{
		      							id: "zDomaindiv",
		      							class: "zf-wb-innerWrapper"
		    						},
		    						wpCreateElem("label",null,"Select the domain your Zoho account belongs to",wpCreateElem("em",null,"*")),
		    						wpCreateElem("div",
		    							{
		    								class: "zf-wb-dropWrapper"
		    							},
		    							wpCreateElem("select",
											{
									        	id: "zf_domain",
									        	onChange: hideDomainError,
									      	},
									      	wpCreateElem("option",
									        	{
									          		value: "-select-"
									        	},
									        	"-Select-"
									      	),
									      	wpCreateElem("option",
									        	{
									          		value: ".com"
									        	},
									        	"zoho.com"
									      	),
									      	wpCreateElem("option",
									        	{
									          		value: ".eu"
									        	},
									        	"zoho.eu"
									      	),
									      	wpCreateElem("option",
									        	{
									          		value: ".com.cn"
									        	},
									        	"zoho.com.cn"
									      	),
									      	wpCreateElem("option",
									        	{
									          		value: ".in"
									        	},
									        	"zoho.in"
									      	)
									    )
									),
		    						wpCreateElem("p",{ id:"domainErr", style:{display:'none'}},"Please choose a domain."),
		    						wpCreateElem("div",{class:"zf-wb-connect-btn zf-wb-Fotter"},wpCreateElem("button", { onClick: getZohoForms, class: "zf-wb-blue" },"Connect"))
		  						);
		var formListEmbedDiv = wpCreateElem("div",
		    						{
		    							id: "zFormSelectDiv", 
		    							style: {
		        							display: 'none',
		      							},
		      							class: "zf-wb-innerWrapper"
		      						},
		      						wpCreateElem("div",
		      							{
		      								class: "zf-wb-innerWrapper"
		      							},
		      						wpCreateElem("label",null,"Choose a form",wpCreateElem("em",null,"*")),
		      						wpCreateElem("div",
		      							{
		      								class: "zf-wb-dropWrapper"
		      							},
			      						wpCreateElem("select", 
			      							{
				      							id: "zf_formslist",
				      							onChange : hideFormSelectError,
				      						},
				      						wpCreateElem("option",
						        				{
						          					value: "-select-"
						        				},
						        				"-Select-"
						   					)
						   				)
		      						),
		    						wpCreateElem("p",{id: "formSelectError",style: {display: 'none'}},"Please select a form.")),
		    						wpCreateElem("div",
      									{
      										class: "zf-wb-twoColumns"
      									},
      									wpCreateElem("div",
        									{
        										class: "zf-wb-innerWrapper flLeft"
        									},
        									wpCreateElem("label", null, "Width "),
        									wpCreateElem("div",
          										null,
					          					wpCreateElem("input", 
					          						{
					            						type: "text",
										            	id: "zformWidth",
										            	placeholder: "100%"
					          						}
					          					)
        									)
      									),
					      				wpCreateElem("div",
					        				{
					        					class: "zf-wb-innerWrapper flRight"
					        				},
					        				wpCreateElem("label", null, "Height "),
					        				wpCreateElem("div",
					          					null,
					          					wpCreateElem("input", 
					          						{
						            					type: "text",
											            id: "zformHeight",
											            placeholder: "600px"
					          						}
					          					)
					        				)
					      				)
    								),
		    						wpCreateElem("div",{class: "clearBoth"}),
									wpCreateElem("div",{class: "zf-wb-Fotter"},wpCreateElem("button",{class: "zf-wb-blue", onClick: zf_choose_form_embed },"Embed" ))
					
		  						);
		var refreshDiv = wpCreateElem("div",
			  				{
							    id: "zfRefreshDiv",
							    style: {
							      display: 'none'
							    },
							    class: "zf-wb-signWrapper"
			  				},
			  				wpCreateElem("p", null,"Click 'Refresh' to choose a form."),
			  				wpCreateElem("button", {  id: "refreshLink", onClick: getZohoForms, class: "zf-wb-lightblue" },"Refresh")
						);
		var createFormDiv = wpCreateElem("div",
								{
								    id: "zfCreateFormDiv",
								    style: {
								      display: 'none'
								    },
								    class: "zf-wb-signWrapper"
							  	},
			  					wpCreateElem("p", null,"You don't have any forms."),
			  					wpCreateElem("button", {  id: "createFormLink", onClick: openSigninOrCreateForm, class: "zf-wb-green"},"CREATE A NEW FORM")
							);
  		var chooseZFormDiv = wpCreateElem("div",
		  						{
								    id: "chooseZohoFormDiv",
								    class: "zf-wb-outerWrapper",
								    style: {
								      display: 'none'
								    }
		  						},
		  						wpCreateElem("div",
		  							{class: "zf-wb-headwrap"},
		  							wpCreateElem("span",{class: "zf-wb-backIocn", onClick:goToHomeDiv},backSvgIcon),
		  							wpCreateElem("div",{class: "zf-wb-heading"},"Choose your form")
		  						),
		  						wpCreateElem("div",{id: "loadingDiv", class: "zf-wb-loading" ,style: {display: 'none'}},wpCreateElem("p",null,"loading"),wpCreateElem("div",{class: "zf-wb-spinner"},wpCreateElem("div",{class:"bounce1"}),wpCreateElem("div",{class:"bounce2"}),wpCreateElem("div",{class:"bounce3"}))),
		  						domainDropDownElem,
		  						formListEmbedDiv,
								refreshDiv,
								createFormDiv
							);

  		var permaLinkEmbedDiv = wpCreateElem("div",
									{
										id : "formPermaLinkPasteDiv",
										class: "zf-wb-outerWrapper",
										style: { display:'none'}
									},
									wpCreateElem("div",
		  								{class: "zf-wb-headwrap"},
		  								wpCreateElem("span",{class: "zf-wb-backIocn", onClick:goToHomeDiv},backSvgIcon),
		  								wpCreateElem("div",{class: "zf-wb-heading"},"Enter form permalink")
		  							),
									wpCreateElem("div",
										{ 
											class: "zf-wb-innerWrapper"
										},
										wpCreateElem("label",null,"Enter your form's permalink URL",wpCreateElem("em",null,"*")),
										wpCreateElem("textarea",
						 					{ 
						 						id: "permalink", 
						 						rows: "4", 
						 						onChange: hideError, 
						 						style: { width: '100%' } 
						 					}
						 				),
						 				wpCreateElem("p", { id: "permaLinkError", style: {display:'none'} },"Please enter your form's permalink URL."),
						 				wpCreateElem("span",null,"Not sure where to find the permalink URL? ",wpCreateElem("a",{href: "https://www.zoho.com/forms/help/share/public-sharing.html#link", target: "_blank"},"Click here "),wpCreateElem("span",null,"to learn more."))
									),
									wpCreateElem("div",
      									{
      										class: "zf-wb-twoColumns"
      									},
      									wpCreateElem("div",
        									{
        										class:"zf-wb-innerWrapper flLeft"
        									},
        									wpCreateElem("label", null, "Width "),
        									wpCreateElem("input", 
					          					{
									            	type: "text",
									            	id: "formWidth",
									            	placeholder: "100%"
					          					}
					        				)
        								),
					      				wpCreateElem("div",
					        				{
					        					class:"zf-wb-innerWrapper flRight"
					        				},
					        				wpCreateElem("label", null, "Height "),
					        				wpCreateElem("input", 
					        					{
					            					type: "text",
					            					id: "formHeight",
					            					placeholder: "600px"
					          					}
					          				)
					        			),
					      				wpCreateElem("div",{class:"clearBoth"},null)
    								),
    								wpCreateElem("div",{class:"zf-wb-Fotter"},wpCreateElem("button",{class:"zf-wb-blue", onClick: zf_block_embed},"Embed"))
								);
		var brandingFotter = wpCreateElem("div",
								{
									class:"zf-wb-brandWrapper"
								},
								wpCreateElem("div",
									{
										class:"flRight zf-wb-brandCont"
									},
									wpCreateElem("span",
										{
											class:"flLeft"
										},
										"Powered by"
									),
									wpCreateElem("img",
										{
											src: zohoFormsBlock.footerIcon,
											alt: "Zoho",
											class:"flLeft",
											style: {
												height: "20px"
											}
										}
									)
								),
								wpCreateElem("div",{class:"clearBoth"})
							);
  		return wpCreateElem("div", 
	  				{
	  					class: "zf-wb-containerWrapper"
	  				},
	  				wpCreateElem("link", 
	  					{
	  						href: zohoFormsBlock.blockCSS,
	  						rel: "stylesheet"
	  					}
	  				),
					wpCreateElem("div",
			  				{
			    				id: "zfHomeDiv",
							    
							    class: "zf-wb-signWrapper"
			  				},
			  				wpCreateElem("p", null,"You can choose a form from your Zoho forms account or enter your form's permalink URL and embed it."),
			  				wpCreateElem("button", { class:"zf-wb-blue", onClick: chooseForm },"Access Zoho Forms"),
			  				wpCreateElem("label",null,"or"),
			  				wpCreateElem("a",{onClick: embedPerma},"Embed using permalink")
					), 	
	  				permaLinkEmbedDiv,
	  				chooseZFormDiv,
	  				wpCreateElem("div", { id: "blockEditShortCodeDiv"} ),
	  				brandingFotter
  				);
  	},
  	save:function(props){
  		return wpCreateElem(
  			"div", 
  			null,
  			props.attributes.zf_short_code
  		)
  		
  	}
})