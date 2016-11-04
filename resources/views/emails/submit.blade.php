<h2><span>ข้อมูลส่วนตัว</span></h2>
<b>ชื่อ:</b> {{ $data['first_name'] }}
<br/>
<b>นามสกุล:</b> {{ $data['last_name'] }}
<br/>
<b>ชื่อเล่น:</b> {{ $data['nick_name'] }}
<br/>
<b>Facebook:</b> {{ $data['facebook'] }}
<br/>
<b>Instagram:</b> {{ $data['instagram'] }}
<br/>
<b>E-Mail:</b> {{ $data['email'] }}
<br/>
<b>Youtube Channel:</b> {{ $data['youtube'] }}
<br/>
<b>Website:</b> {{ $data['website'] }}
<br/>
<b>Line ID:</b> {{ $data['lineID'] }}
<br/>
<b>WhatApp ID:</b> {{ $data['whatappID'] }}
<br/>
<b>เบอร์บ้าน:</b> {{ $data['phone'] }}
<br/>
<b>เบอร์มือถือ:</b> {{ $data['mobile'] }}
<br/>
<b>อาชีพ:</b> {{ $data['job'] }}
<br/>
@if(count($data['interested_in']) || (isset($data['interested_in_liposuction']) && $data['interested_in_liposuction']!="") || (isset($data['interested_in_other']) && $data['interested_in_other']!=""))
<b>สนใจทำอะไร:</b>
<ul>
@if(in_array('ตา', $data['interested_in']))
<li>ตา</li>
@endif
@if(in_array('จมูก', $data['interested_in']))
<li>จมูก</li>
@endif
@if(in_array('หน้าอก', $data['interested_in']))
<li>หน้าอก</li>
@endif
@if(in_array('ปาก', $data['interested_in']))
<li>ปาก</li>
@endif
@if(in_array('ผม', $data['interested_in']))
<li>ผม</li>
@endif
@if(in_array('ถุงใต้ตา', $data['interested_in']))
<li>ถุงใต้ตา</li>
@endif
@if(isset($data['interested_in_liposuction']) && $data['interested_in_liposuction']!="")
<li> {{ $data['interested_in_liposuction'] }}</li>
@endif
@if(isset($data['interested_in_other']) && $data['interested_in_other']!="")
<li> {{ $data['interested_in_other'] }}</li>
@endif
</ul>
@endif
<br/>
<h2><span>ข้อมูลการแพทย์</span></h2>
<h3><span>ประวัติการรักษาทางการแพทย์</span></h3>
<br/>
<table border="1" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
@for($i=1; $i<=5; $i++)
<tr>
<td width="10%">
{{$i}}
</td>
<td width="22.5%">
<b>เคยทำอะไร:</b>
<br/>
{{ $data['medical_histories'][$i-1]['what'] }}
</td>
<td width="22.5%">
<b>ที่ไหน:</b>
<br/>
{{ $data['medical_histories'][$i-1]['where'] }}
</td>
<td width="22.5%">
<b>แพทย์:</b>
<br/>
{{ $data['medical_histories'][$i-1]['doctor'] }}
</td>
<td width="22.5%">
<b>ระยะเวลา:</b>
<br/>
{{ $data['medical_histories'][$i-1]['duration'] }}
</td>
</tr>
<tr>
<td colspan="5">&nbsp;</td>
</tr>
@endfor
</table>
<b>โรคประจำตัว:</b> {{ $data['congenital_disease'] }}
<br/>
<b>ยาที่ใช้ปัจจุบัน:</b> {{ $data['current_drug'] }}
<br/>
<b>อาการแพ้ยา:</b> {{ $data['drug_symptom'] }}
<br/>
<b>ความต้องการ:</b> {{ $data['need'] }}
<br/>
<b>หมายเหตุ:</b> {{ $data['note'] }}