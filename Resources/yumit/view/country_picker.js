
(function() {
    Yumit.ui.countryPicker = function(customItemValue) {
        var winWithPicker = new Window({
    	    id: 'defaultWindow',
    	    title: 'Choose country'
        });
    		
        var container = Ti.UI.createView({
            layout: 'vertical'
        });

        var picker = Ti.UI.createPicker({
    	    top: 20,
            height: 'auto'
        });
        var data = [];
        data[0]=Ti.UI.createPickerRow({title:'Afghanistan',custom_item:'AF'});
        data[1]=Ti.UI.createPickerRow({title:'Aland Islands',custom_item:'AX'});
        data[2]=Ti.UI.createPickerRow({title:'Albania',custom_item:'AL'});
        data[3]=Ti.UI.createPickerRow({title:'Algeria',custom_item:'DZ'});
        data[4]=Ti.UI.createPickerRow({title:'American Samoa',custom_item:'AS'});
        data[5]=Ti.UI.createPickerRow({title:'Andorra',custom_item:'AD'});
        data[6]=Ti.UI.createPickerRow({title:'Angola',custom_item:'AO'});
        data[7]=Ti.UI.createPickerRow({title:'Anguilla',custom_item:'AI'});
        data[8]=Ti.UI.createPickerRow({title:'Antarctica',custom_item:'AQ'});
        data[9]=Ti.UI.createPickerRow({title:'Antigua and Barbuda',custom_item:'AG'});
        data[10]=Ti.UI.createPickerRow({title:'Argentina',custom_item:'AR'});
        data[11]=Ti.UI.createPickerRow({title:'Armenia',custom_item:'AM'});
        data[12]=Ti.UI.createPickerRow({title:'Aruba',custom_item:'AW'});
        data[13]=Ti.UI.createPickerRow({title:'Australia',custom_item:'AU'});
        data[14]=Ti.UI.createPickerRow({title:'Austria',custom_item:'AT'});
        data[15]=Ti.UI.createPickerRow({title:'Azerbaijan',custom_item:'AZ'});
        data[16]=Ti.UI.createPickerRow({title:'Bahamas',custom_item:'BS'});
        data[17]=Ti.UI.createPickerRow({title:'Bahrain',custom_item:'BH'});
        data[18]=Ti.UI.createPickerRow({title:'Bangladesh',custom_item:'BD'});
        data[19]=Ti.UI.createPickerRow({title:'Barbados',custom_item:'BB'});
        data[20]=Ti.UI.createPickerRow({title:'Belarus',custom_item:'BY'});
        data[21]=Ti.UI.createPickerRow({title:'Belgium',custom_item:'BE'});
        data[22]=Ti.UI.createPickerRow({title:'Belize',custom_item:'BZ'});
        data[23]=Ti.UI.createPickerRow({title:'Benin',custom_item:'BJ'});
        data[24]=Ti.UI.createPickerRow({title:'Bermuda',custom_item:'BM'});
        data[25]=Ti.UI.createPickerRow({title:'Bhutan',custom_item:'BT'});
        data[26]=Ti.UI.createPickerRow({title:'Bolivia',custom_item:'BO'});
        data[27]=Ti.UI.createPickerRow({title:'Bosnia and Herzegovina',custom_item:'BA'});
        data[28]=Ti.UI.createPickerRow({title:'Botswana',custom_item:'BW'});
        data[29]=Ti.UI.createPickerRow({title:'Bouvet Island',custom_item:'BV'});
        data[30]=Ti.UI.createPickerRow({title:'Brazil',custom_item:'BR'});
        data[31]=Ti.UI.createPickerRow({title:'British Antarctic Territory',custom_item:'TQ'});
        data[32]=Ti.UI.createPickerRow({title:'British Indian Ocean Territory',custom_item:'IO'});
        data[33]=Ti.UI.createPickerRow({title:'British Virgin Islands',custom_item:'VG'});
        data[34]=Ti.UI.createPickerRow({title:'Brunei',custom_item:'BN'});
        data[35]=Ti.UI.createPickerRow({title:'Bulgaria',custom_item:'BG'});
        data[36]=Ti.UI.createPickerRow({title:'Burkina Faso',custom_item:'BF'});
        data[37]=Ti.UI.createPickerRow({title:'Burundi',custom_item:'BI'});
        data[38]=Ti.UI.createPickerRow({title:'Cambodia',custom_item:'KH'});
        data[39]=Ti.UI.createPickerRow({title:'Cameroon',custom_item:'CM'});
        data[40]=Ti.UI.createPickerRow({title:'Canada',custom_item:'CA'});
        data[41]=Ti.UI.createPickerRow({title:'Canton and Enderbury Islands',custom_item:'CT'});
        data[42]=Ti.UI.createPickerRow({title:'Cape Verde',custom_item:'CV'});
        data[43]=Ti.UI.createPickerRow({title:'Cayman Islands',custom_item:'KY'});
        data[44]=Ti.UI.createPickerRow({title:'Central African Republic',custom_item:'CF'});
        data[45]=Ti.UI.createPickerRow({title:'Chad',custom_item:'TD'});
        data[46]=Ti.UI.createPickerRow({title:'Chile',custom_item:'CL'});
        data[47]=Ti.UI.createPickerRow({title:'China',custom_item:'CN'});
        data[48]=Ti.UI.createPickerRow({title:'Christmas Island',custom_item:'CX'});
        data[49]=Ti.UI.createPickerRow({title:'Cocos Islands',custom_item:'CC'});
        data[50]=Ti.UI.createPickerRow({title:'Colombia',custom_item:'CO'});
        data[51]=Ti.UI.createPickerRow({title:'Comoros',custom_item:'KM'});
        data[52]=Ti.UI.createPickerRow({title:'Congo-Brazzaville',custom_item:'CG'});
        data[53]=Ti.UI.createPickerRow({title:'Congo-Kinshasa',custom_item:'CD'});
        data[54]=Ti.UI.createPickerRow({title:'Cook Islands',custom_item:'CK'});
        data[55]=Ti.UI.createPickerRow({title:'Costa Rica',custom_item:'CR'});
        data[56]=Ti.UI.createPickerRow({title:'Croatia',custom_item:'HR'});
        data[57]=Ti.UI.createPickerRow({title:'Cuba',custom_item:'CU'});
        data[58]=Ti.UI.createPickerRow({title:'Cyprus',custom_item:'CY'});
        data[59]=Ti.UI.createPickerRow({title:'Czech Republic',custom_item:'CZ'});
        data[60]=Ti.UI.createPickerRow({title:'Denmark',custom_item:'DK'});
        data[61]=Ti.UI.createPickerRow({title:'Djibouti',custom_item:'DJ'});
        data[62]=Ti.UI.createPickerRow({title:'Dominica',custom_item:'DM'});
        data[63]=Ti.UI.createPickerRow({title:'Dominican Republic',custom_item:'DO'});
        data[64]=Ti.UI.createPickerRow({title:'Dronning Maud Land',custom_item:'NQ'});
        data[65]=Ti.UI.createPickerRow({title:'East Germany',custom_item:'DD'});
        data[66]=Ti.UI.createPickerRow({title:'East Timor',custom_item:'TL'});
        data[67]=Ti.UI.createPickerRow({title:'Ecuador',custom_item:'EC'});
        data[68]=Ti.UI.createPickerRow({title:'Egypt',custom_item:'EG'});
        data[69]=Ti.UI.createPickerRow({title:'El Salvador',custom_item:'SV'});
        data[70]=Ti.UI.createPickerRow({title:'Equatorial Guinea',custom_item:'GQ'});
        data[71]=Ti.UI.createPickerRow({title:'Eritrea',custom_item:'ER'});
        data[72]=Ti.UI.createPickerRow({title:'Estonia',custom_item:'EE'});
        data[73]=Ti.UI.createPickerRow({title:'Ethiopia',custom_item:'ET'});
        data[74]=Ti.UI.createPickerRow({title:'European Union',custom_item:'QU'});
        data[75]=Ti.UI.createPickerRow({title:'Falkland Islands',custom_item:'FK'});
        data[76]=Ti.UI.createPickerRow({title:'Faroe Islands',custom_item:'FO'});
        data[77]=Ti.UI.createPickerRow({title:'Fiji',custom_item:'FJ'});
        data[78]=Ti.UI.createPickerRow({title:'Finland',custom_item:'FI'});
        data[79]=Ti.UI.createPickerRow({title:'France',custom_item:'FR'});
        data[80]=Ti.UI.createPickerRow({title:'French Guiana',custom_item:'GF'});
        data[81]=Ti.UI.createPickerRow({title:'French Polynesia',custom_item:'PF'});
        data[82]=Ti.UI.createPickerRow({title:'French Southern And Antarctic Territories',custom_item:'FQ'});
        data[83]=Ti.UI.createPickerRow({title:'French Southern Territories',custom_item:'TF'});
        data[84]=Ti.UI.createPickerRow({title:'Gabon',custom_item:'GA'});
        data[85]=Ti.UI.createPickerRow({title:'Gambia',custom_item:'GM'});
        data[86]=Ti.UI.createPickerRow({title:'Georgia',custom_item:'GE'});
        data[87]=Ti.UI.createPickerRow({title:'Germany',custom_item:'DE'});
        data[88]=Ti.UI.createPickerRow({title:'Ghana',custom_item:'GH'});
        data[89]=Ti.UI.createPickerRow({title:'Gibraltar',custom_item:'GI'});
        data[90]=Ti.UI.createPickerRow({title:'Greese',custom_item:'GR'});
        data[91]=Ti.UI.createPickerRow({title:'Greenland',custom_item:'GL'});
        data[92]=Ti.UI.createPickerRow({title:'Grenada',custom_item:'GD'});
        data[93]=Ti.UI.createPickerRow({title:'Guadeloupe',custom_item:'GP'});
        data[94]=Ti.UI.createPickerRow({title:'Guam',custom_item:'GU'});
        data[95]=Ti.UI.createPickerRow({title:'Guatemala',custom_item:'GT'});
        data[96]=Ti.UI.createPickerRow({title:'Guernsey',custom_item:'GG'});
        data[97]=Ti.UI.createPickerRow({title:'Guinea',custom_item:'GN'});
        data[98]=Ti.UI.createPickerRow({title:'Guinea-Bissau',custom_item:'GW'});
        data[99]=Ti.UI.createPickerRow({title:'Guyana',custom_item:'GY'});
        data[100]=Ti.UI.createPickerRow({title:'Haiti',custom_item:'HT'});
        data[101]=Ti.UI.createPickerRow({title:'Heard Island and McDonald Islands',custom_item:'HM'});
        data[102]=Ti.UI.createPickerRow({title:'Honduras',custom_item:'HN'});
        data[103]=Ti.UI.createPickerRow({title:'Hongkong',custom_item:'HK'});
        data[104]=Ti.UI.createPickerRow({title:'Hungary',custom_item:'HU'});
        data[105]=Ti.UI.createPickerRow({title:'Iceland',custom_item:'IS'});
        data[106]=Ti.UI.createPickerRow({title:'India',custom_item:'IN'});
        data[107]=Ti.UI.createPickerRow({title:'Indonesia',custom_item:'ID'});
        data[108]=Ti.UI.createPickerRow({title:'Iran',custom_item:'IR'});
        data[109]=Ti.UI.createPickerRow({title:'Iraq',custom_item:'IQ'});
        data[110]=Ti.UI.createPickerRow({title:'Ireland',custom_item:'IE'});
        data[111]=Ti.UI.createPickerRow({title:'Isle of Man',custom_item:'IM'});
        data[112]=Ti.UI.createPickerRow({title:'Israel',custom_item:'IL'});
        data[113]=Ti.UI.createPickerRow({title:'Italy',custom_item:'IT'});
        data[114]=Ti.UI.createPickerRow({title:'Ivory Coast',custom_item:'CI'});
        data[115]=Ti.UI.createPickerRow({title:'Jamaica',custom_item:'JM'});
        data[116]=Ti.UI.createPickerRow({title:'Japan',custom_item:'JP'});
        data[117]=Ti.UI.createPickerRow({title:'Jersey',custom_item:'JE'});
        data[118]=Ti.UI.createPickerRow({title:'Johnston Island',custom_item:'JT'});
        data[119]=Ti.UI.createPickerRow({title:'Jordan',custom_item:'JO'});
        data[120]=Ti.UI.createPickerRow({title:'Kazakhstan',custom_item:'KZ'});
        data[121]=Ti.UI.createPickerRow({title:'Kenya',custom_item:'KE'});
        data[122]=Ti.UI.createPickerRow({title:'Kiribati',custom_item:'KI'});
        data[123]=Ti.UI.createPickerRow({title:'Kuwait',custom_item:'KW'});
        data[124]=Ti.UI.createPickerRow({title:'Kyrgyzstan',custom_item:'KG'});
        data[125]=Ti.UI.createPickerRow({title:'Laos',custom_item:'LA'});
        data[126]=Ti.UI.createPickerRow({title:'Latvia',custom_item:'LV'});
        data[127]=Ti.UI.createPickerRow({title:'Lebanon',custom_item:'LB'});
        data[128]=Ti.UI.createPickerRow({title:'Lesotho',custom_item:'LS'});
        data[129]=Ti.UI.createPickerRow({title:'Liberia',custom_item:'LR'});
        data[130]=Ti.UI.createPickerRow({title:'Libya',custom_item:'LY'});
        data[131]=Ti.UI.createPickerRow({title:'Liechtenstein',custom_item:'LI'});
        data[132]=Ti.UI.createPickerRow({title:'Lithuania',custom_item:'LT'});
        data[133]=Ti.UI.createPickerRow({title:'Luxembourg',custom_item:'LU'});
        data[134]=Ti.UI.createPickerRow({title:'Macau',custom_item:'MO'});
        data[135]=Ti.UI.createPickerRow({title:'Macedonia',custom_item:'MK'});
        data[136]=Ti.UI.createPickerRow({title:'Madagascar',custom_item:'MG'});
        data[137]=Ti.UI.createPickerRow({title:'Malawi',custom_item:'MW'});
        data[138]=Ti.UI.createPickerRow({title:'Malaysia',custom_item:'MY'});
        data[139]=Ti.UI.createPickerRow({title:'Maldives',custom_item:'MV'});
        data[140]=Ti.UI.createPickerRow({title:'Mali',custom_item:'ML'});
        data[141]=Ti.UI.createPickerRow({title:'Malta',custom_item:'MT'});
        data[142]=Ti.UI.createPickerRow({title:'Marshall Islands',custom_item:'MH'});
        data[143]=Ti.UI.createPickerRow({title:'Martinique',custom_item:'MQ'});
        data[144]=Ti.UI.createPickerRow({title:'Mauritania',custom_item:'MR'});
        data[145]=Ti.UI.createPickerRow({title:'Mauritius',custom_item:'MU'});
        data[146]=Ti.UI.createPickerRow({title:'Mayotte',custom_item:'YT'});
        data[147]=Ti.UI.createPickerRow({title:'Metropolitan France',custom_item:'FX'});
        data[148]=Ti.UI.createPickerRow({title:'Mexico',custom_item:'MX'});
        data[149]=Ti.UI.createPickerRow({title:'Micronesia',custom_item:'FM'});
        data[150]=Ti.UI.createPickerRow({title:'Midway Islands',custom_item:'MI'});
        data[151]=Ti.UI.createPickerRow({title:'Moldova',custom_item:'MD'});
        data[152]=Ti.UI.createPickerRow({title:'Monaco',custom_item:'MC'});
        data[153]=Ti.UI.createPickerRow({title:'Mongolia',custom_item:'MN'});
        data[154]=Ti.UI.createPickerRow({title:'Montenegro',custom_item:'ME'});
        data[155]=Ti.UI.createPickerRow({title:'Montserrat',custom_item:'MS'});
        data[156]=Ti.UI.createPickerRow({title:'Morocco',custom_item:'MA'});
        data[157]=Ti.UI.createPickerRow({title:'Mozambique',custom_item:'MZ'});
        data[158]=Ti.UI.createPickerRow({title:'Myanmar',custom_item:'MM'});
        data[159]=Ti.UI.createPickerRow({title:'Namibia',custom_item:'NA'});
        data[160]=Ti.UI.createPickerRow({title:'Nauru',custom_item:'NR'});
        data[161]=Ti.UI.createPickerRow({title:'Nepal',custom_item:'NP'});
        data[162]=Ti.UI.createPickerRow({title:'Netherlands',custom_item:'NL'});
        data[163]=Ti.UI.createPickerRow({title:'Netherlands Antilles',custom_item:'AN'});
        data[164]=Ti.UI.createPickerRow({title:'Neutral Zone',custom_item:'NT'});
        data[165]=Ti.UI.createPickerRow({title:'New Caledonia',custom_item:'NC'});
        data[166]=Ti.UI.createPickerRow({title:'New Zealand',custom_item:'NZ'});
        data[167]=Ti.UI.createPickerRow({title:'Nicaragua',custom_item:'NI'});
        data[168]=Ti.UI.createPickerRow({title:'Niger',custom_item:'NE'});
        data[169]=Ti.UI.createPickerRow({title:'Nigeria',custom_item:'NG'});
        data[170]=Ti.UI.createPickerRow({title:'Niue',custom_item:'NU'});
        data[171]=Ti.UI.createPickerRow({title:'Norfolk Island',custom_item:'NF'});
        data[172]=Ti.UI.createPickerRow({title:'North Korea',custom_item:'KP'});
        data[173]=Ti.UI.createPickerRow({title:'North Vietnam',custom_item:'VD'});
        data[174]=Ti.UI.createPickerRow({title:'Northern Mariana Islands',custom_item:'MP'});
        data[175]=Ti.UI.createPickerRow({title:'Norway',custom_item:'NO'});
        data[176]=Ti.UI.createPickerRow({title:'Oman',custom_item:'OM'});
        data[177]=Ti.UI.createPickerRow({title:'Outlying Oceania',custom_item:'QO'});
        data[178]=Ti.UI.createPickerRow({title:'Pacific Islands Trust Territory',custom_item:'PC'});
        data[179]=Ti.UI.createPickerRow({title:'Pakistan',custom_item:'PK'});
        data[180]=Ti.UI.createPickerRow({title:'Palau',custom_item:'PW'});
        data[181]=Ti.UI.createPickerRow({title:'Palestinian Territory',custom_item:'PS'});
        data[182]=Ti.UI.createPickerRow({title:'Panama',custom_item:'PA'});
        data[183]=Ti.UI.createPickerRow({title:'Panama Canal Zone',custom_item:'PZ'});
        data[184]=Ti.UI.createPickerRow({title:'Papua New Guinea',custom_item:'PG'});
        data[185]=Ti.UI.createPickerRow({title:'Paraguay',custom_item:'PY'});
        data[186]=Ti.UI.createPickerRow({title:"People's Democratic Republic of Yemen",custom_item:'YD'});
        data[187]=Ti.UI.createPickerRow({title:'Peru',custom_item:'PE'});
        data[188]=Ti.UI.createPickerRow({title:'Philippines',custom_item:'PH'});
        data[189]=Ti.UI.createPickerRow({title:'Pitcairn',custom_item:'PN'});
        data[190]=Ti.UI.createPickerRow({title:'Poland',custom_item:'PL'});
        data[191]=Ti.UI.createPickerRow({title:'Portugal',custom_item:'PT'});
        data[192]=Ti.UI.createPickerRow({title:'Puerto Rico',custom_item:'PR'});
        data[193]=Ti.UI.createPickerRow({title:'Qatar',custom_item:'QA'});
        data[194]=Ti.UI.createPickerRow({title:'Reunion',custom_item:'RE'});
        data[195]=Ti.UI.createPickerRow({title:'Romania',custom_item:'RO'});
        data[196]=Ti.UI.createPickerRow({title:'Russia',custom_item:'RU'});
        data[197]=Ti.UI.createPickerRow({title:'Rwanda',custom_item:'RW'});
        data[198]=Ti.UI.createPickerRow({title:'Saint Barthélemy',custom_item:'BL'});
        data[199]=Ti.UI.createPickerRow({title:'Saint Helena',custom_item:'SH'});
        data[200]=Ti.UI.createPickerRow({title:'Saint Kitts and Nevis',custom_item:'KN'});
        data[201]=Ti.UI.createPickerRow({title:'Saint Lucia',custom_item:'LC'});
        data[202]=Ti.UI.createPickerRow({title:'Saint Martin',custom_item:'MF'});
        data[203]=Ti.UI.createPickerRow({title:'Saint Pierre and Miquelon',custom_item:'PM'});
        data[204]=Ti.UI.createPickerRow({title:'Saint Vincent and the Grenadines',custom_item:'VC'});
        data[205]=Ti.UI.createPickerRow({title:'Samoa',custom_item:'WS'});
        data[206]=Ti.UI.createPickerRow({title:'San Marino',custom_item:'SM'});
        data[207]=Ti.UI.createPickerRow({title:'Sao Tome and Principe',custom_item:'ST'});
        data[208]=Ti.UI.createPickerRow({title:'Saudi Adabia',custom_item:'SA'});
        data[209]=Ti.UI.createPickerRow({title:'Senegal',custom_item:'SN'});
        data[210]=Ti.UI.createPickerRow({title:'Serbia',custom_item:'RS'});
        data[211]=Ti.UI.createPickerRow({title:'Serbia and Montenegro',custom_item:'CS'});
        data[212]=Ti.UI.createPickerRow({title:'Seychelles',custom_item:'SC'});
        data[213]=Ti.UI.createPickerRow({title:'Sierra Leone',custom_item:'SL'});
        data[214]=Ti.UI.createPickerRow({title:'Singapore',custom_item:'SG'});
        data[215]=Ti.UI.createPickerRow({title:'Slovakia',custom_item:'SK'});
        data[216]=Ti.UI.createPickerRow({title:'Slovenia',custom_item:'SI'});
        data[217]=Ti.UI.createPickerRow({title:'Solomon Islands',custom_item:'SB'});
        data[218]=Ti.UI.createPickerRow({title:'Somalia',custom_item:'SO'});
        data[219]=Ti.UI.createPickerRow({title:'South Africa',custom_item:'ZA'});
        data[220]=Ti.UI.createPickerRow({title:'South Georgia and the South Sandwich Islands',custom_item:'GS'});
        data[221]=Ti.UI.createPickerRow({title:'South Korea',custom_item:'KR'});
        data[222]=Ti.UI.createPickerRow({title:'Spain',custom_item:'ES'});
        data[223]=Ti.UI.createPickerRow({title:'Sri Lanka',custom_item:'LK'});
        data[224]=Ti.UI.createPickerRow({title:'Sudan',custom_item:'SD'});
        data[225]=Ti.UI.createPickerRow({title:'Suriname',custom_item:'SR'});
        data[226]=Ti.UI.createPickerRow({title:'Svalbard and Jan Mayen',custom_item:'SJ'});
        data[227]=Ti.UI.createPickerRow({title:'Swaziland',custom_item:'SZ'});
        data[228]=Ti.UI.createPickerRow({title:'Sweden',custom_item:'SE'});
        data[229]=Ti.UI.createPickerRow({title:'Switzerland',custom_item:'CH'});
        data[230]=Ti.UI.createPickerRow({title:'Syria',custom_item:'SY'});
        data[231]=Ti.UI.createPickerRow({title:'Taiwan',custom_item:'TW'});
        data[232]=Ti.UI.createPickerRow({title:'Tajikistan',custom_item:'TJ'});
        data[233]=Ti.UI.createPickerRow({title:'Tanzania',custom_item:'TZ'});
        data[234]=Ti.UI.createPickerRow({title:'Thailand',custom_item:'TH'});
        data[235]=Ti.UI.createPickerRow({title:'Togo',custom_item:'TG'});
        data[236]=Ti.UI.createPickerRow({title:'Tokelau',custom_item:'TK'});
        data[237]=Ti.UI.createPickerRow({title:'Tonga',custom_item:'TO'});
        data[238]=Ti.UI.createPickerRow({title:'Trinidad and Tobago',custom_item:'TT'});
        data[239]=Ti.UI.createPickerRow({title:'Tunisia',custom_item:'TN'});
        data[240]=Ti.UI.createPickerRow({title:'Turkey',custom_item:'TR'});
        data[241]=Ti.UI.createPickerRow({title:'Turkmenistan',custom_item:'TM'});
        data[242]=Ti.UI.createPickerRow({title:'Turks and Caicos Islands',custom_item:'TC'});
        data[243]=Ti.UI.createPickerRow({title:'Tuvalu',custom_item:'TV'});
        data[244]=Ti.UI.createPickerRow({title:'U.S. Miscellaneous Pacific Islands',custom_item:'PU'});
        data[245]=Ti.UI.createPickerRow({title:'U.S. Virgin Islands',custom_item:'VI'});
        data[246]=Ti.UI.createPickerRow({title:'Uganda',custom_item:'UG'});
        data[247]=Ti.UI.createPickerRow({title:'Ukraine',custom_item:'UA'});
        data[248]=Ti.UI.createPickerRow({title:'United Arab Emirates',custom_item:'AE'});
        data[249]=Ti.UI.createPickerRow({title:'United Kingdom',custom_item:'GB'});
        data[250]=Ti.UI.createPickerRow({title:'United States',custom_item:'US'});
        data[251]=Ti.UI.createPickerRow({title:'United States Minor Outlying Islands',custom_item:'UM'});
        data[252]=Ti.UI.createPickerRow({title:'Unknown or Invalid Region',custom_item:'ZZ'});
        data[253]=Ti.UI.createPickerRow({title:'Uruguay',custom_item:'UY'});
        data[254]=Ti.UI.createPickerRow({title:'Uzbekistan',custom_item:'UZ'});
        data[255]=Ti.UI.createPickerRow({title:'Vanuatu',custom_item:'VU'});
        data[256]=Ti.UI.createPickerRow({title:'Vatican',custom_item:'VA'});
        data[257]=Ti.UI.createPickerRow({title:'Venezuela',custom_item:'VE'});
        data[258]=Ti.UI.createPickerRow({title:'Vietnam',custom_item:'VN'});
        data[259]=Ti.UI.createPickerRow({title:'Wake Island',custom_item:'WK'});
        data[260]=Ti.UI.createPickerRow({title:'Wallis and Futuna',custom_item:'WF'});
        data[261]=Ti.UI.createPickerRow({title:'Western Sahara',custom_item:'EH'});
        data[262]=Ti.UI.createPickerRow({title:'Yemen',custom_item:'YE'});
        data[263]=Ti.UI.createPickerRow({title:'Zambia',custom_item:'ZM'});
        data[264]=Ti.UI.createPickerRow({title:'Zimbabwe',custom_item:'ZW'});

        var currentIndex = 0;
        for (var i=0, n=data.length; i < n; i++) {
        	if (data[i].custom_item == customItemValue) {
        		currentIndex = i;
        	}
        }

        picker.selectionIndicator = true;
        picker.add(data);
            
        var doneButton = new Button({
        	id: 'defaultYumitButton',
            top: 15,
    		title: 'Done'
        });
        
        var pickedElement;
        picker.addEventListener('change', function(e) {
            if (e.row && e.rowIndex) {
            	pickedElement = e;
            }
        });
            
        doneButton.addEventListener('click', function() {
            Ti.App.fireEvent('Yumit:profile:genderChanged', {pickedElement: pickedElement});
            winWithPicker.close();
        });
        
        winWithPicker.addEventListener('open', function() {
            picker.setSelectedRow(0, currentIndex, true);
        });

        container.add(picker);
        container.add(doneButton);
        winWithPicker.add(container);
        return winWithPicker;
    }
})();