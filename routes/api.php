<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SubmitForm;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

header('Access-Control-Allow-Origin:  *');
//header('Access-Control-Allow-Origin:  http://schedule.mspinfo.net');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, PATCH, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, Authorization, Access-Token');

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'Auth\JWTAuthController@login');
});

Route::resource('users', 'Main\UserController');

Route::delete('upload', 'UploadController@deletePath');
Route::resource('upload', 'UploadController');

Route::get('/submit', function(){
    return sprintf("[%s%04d] %s", date("Ymd"), App\FormNumber::where(DB::raw("date(created_at)"), "=", date("Y-m-d"))->count(), "test");
});
Route::post('/submit/{subject?}', function (Request $request, $subject = 'default') {
    App\FormNumber::create();
    $subject = sprintf("[%s%04d] %s (mspinfo.net/consult)", date("Ymd"), App\FormNumber::where(DB::raw("date(created_at)"), "=", date("Y-m-d"))->count(), $subject);
    $data = $request->except(['files', 'agreement']);
    $images = $request->file('files', []);
    $files = [];
    /*
    $words = [
        'menu:hair' => 'ปลูกผม',
        'menu:forehead' => 'ฟิลเลอร์หน้าผาก',
        'menu:nose' => 'ศัลยกรรมจมูกซิลิโคน',
        'menu:nose-recon' => 'ศัลยกรรมจมูก (Reconstruction)',
        'menu:eyelids' => 'ศัลยกรรมตาสองชั้น',
        'menu:around-eyes' => 'ศัลยกรรมรอบดวงตา',
        'menu:eyebrow' => 'ศัลยกรรมยกคิ้ว',
        'menu:lips' => 'ศัลยกรรมผ่าตัดปาก',
        'menu:breast' => 'ศัลยกรรมหน้าอก',
        'menu:chin' => 'ศัลยกรรมเสริมคาง',
        'menu:cheek-bulge' => 'ศัลยกรรมผ่าตัดไขมันกระพุ้งแก้ม',
        'menu:liposuction' => 'หัตถการดูดไขมัน',
        'menu:liposuction-arm' => 'หัตถการดูดไขมันแขน',
        'menu:liposuction-leg' => 'หัตถการดูดไขมันขา',
        'menu:liposuction-body' => 'หัตถการดูดไขมันหน้าท้อง',
        'menu:liposuction-facial' => 'หัตถการดูดไขมันหน้า',
        'menu:implants' => 'หัตถการปลูกถ่ายไขมัน',
        'menu:others' => 'อื่นๆ',
        'personal_information' => 'ข้อมูลส่วนตัว',
        'basic_information' => 'ข้อมูลเบื้องต้น',
        'first_name' => 'ชื่อจริง',
        'last_name' => 'นามสกุล',
        'nick_name' => 'ชื่อเล่น',
        'phone' => 'เบอร์บ้าน',
        'mobile' => 'เบอร์มือถือ',
        'email' => 'E-Mail',
        'lineID' => 'Line ID',
        'whatappID' => 'WhatApp ID',
        'job' => 'อาชีพ',
        'country' => 'ประเทศ',
        'interested_in' => 'สนใจทำอะไร',
        'medical_histories' => 'ประวัติการรักษาทางการแพทย์',
        'medical_histories[what]' => 'เคยทำอะไร',
        'medical_histories[place]' => 'ที่ไหน',
        'medical_histories[doctor]' => 'แพทย์',
        'medical_histories[duration]' => 'ระยะเวลา',
        'place' => 'ที่ไหน',
        'doctor' => 'แพทย์',
        'duration' => 'ระยะเวลา',
        'medical_information' => 'ข้อมูลทางการแพทย์',
        'nose:histories' => 'ประวัติโรคทางจมูก',
        'nose:conditions' => 'ภาวะจมูก',
        'personal:conditions' => 'ประวัติส่วนตัว',
        'upload_image' => 'อัพโหลดรูปภาพ',
        'eyes' => 'ตา',
        'nose' => 'จมูก',
        'breast' => 'หน้าอก',
        'lips' => 'ปาก',
        'hair' => 'ผม',
        'bags_under_the_eyes' => 'ถุงใต้ตา',
        'interested_in_liposuction_check' => 'ดูดไขมัน',
        'others' => 'อื่นๆ',
        'please_specify' => 'โปรดระบุ',
        'underlying_disease' => 'โรคประจำตัว',
        'current_medication' => 'มีการทานยาเหล่านี้หรือไม่',
        'under_taking_medicine' => 'ยาที่ใช้ปัจจุบัน',
        'drug_symptom' => 'อาการแพ้ยา',
        'allergy' => 'ภูมิแพ้',
        'nasal_congestion' => 'คัดจมูกเรื้อรัง',
        'sinusitis' => 'ไซนัสอักเสบ',
        'accident' => 'อุบัติเหตุ',
        'requirement' => 'ความต้องการเบื้องต้น ',
        'requirement:hint' => 'เช่นต้องการสิ่งใดเป็นพิเศษ, อุปกรณ์ หรือ ระบุแพทย์ที่ต้องการ เป็นต้น.',
        'note' => 'หมายเหตุ',
        'requirement:note' => 'หมายเหตุ',
        'current_shape' => 'รูปแบบทรงหน้าผาก',
        'forehead_filler_histories' => 'ประวัติการฉีดสารเติมเต็ม',
        'forehead_filler_histories:area' => 'บริเวณ',
        'forehead_filler_histories:detail' => 'ลายละเอียดสารเติมเต็ม',
        'forehead_filler_histories:date' => 'วันเดือนปี',
        'forehead_filler_histories:rating' => 'ความพึงพอใจ',
        'rating_of_current_area' => 'ความสวยงามของบริเวณที่จะทำ ณ ขนาดนี้ (ตามความคิดเห็นของคนไข้)',
        'rating_of_current_area:best' => 'ดีมาก',
        'rating_of_current_area:good' => 'มาก',
        'rating_of_current_area:general' => 'ปานกลาง',
        'rating_of_current_area:low' => 'น้อย',
        'rating_of_current_area:bad' => 'น้อยมาก',
        'requesting_area_and_expectation' => 'บริเวณที่ต้องการทำและความคาดหวังที่อยากได้',
        'requesting_reason' => 'เหตุผลหลักที่ต้องการ',
        'question_before_surgery' => 'ข้อซักถามก่อนการทำหัตถการฉีดสารเติมเต็ม',
        'yes' => 'ใช่',
        'no' => 'ไม่',
        'have' => 'มี',
        'do_not_have' => 'ไม่มี',
        'surgery_history:yes' => 'เคย ทำ{surgery}หรือฉีดสารใดๆมาก่อน',
        'surgery_history:no' => 'ไม่เคย ทำ{surgery}หรือฉีดสารใดๆมาก่อน',
        'surgery_count_before' => 'ศัลยกรรมหรือฉีดสารใดๆมาแล้วกี่ครั้ง',
        'surgeries_before' => 'เคยศัลยกรรมอะไร',
        'surgeries_before[how]' => 'ศัลยกรรมอะไร',
        'surgeries_before[where]' => 'ศัลยกรรมที่ไหน',
        'surgeries_before[duration]' => 'ระยะเวลา',
        'how_many_time' => 'ศัลยกรรมหรือฉีดสารใดๆมาแล้วกี่ครั้ง',
        'how_many_time:filler' => 'ฉีดมาแล้วกี่ครั้ง',
        'how_many_time:surgery' => 'ศัลยกรรมแล้วกี่ครั้ง',
        'surgeries_before:how' => 'ศัลยกรรมด้วยวิธีการ',
        'which_method' => 'ด้วยวิธีการ',
        'which_type' => 'ชนิด',
        'eye_tattoo' => 'การสักรอบดวงตา',
        'eye_tattoo:no' => 'ไม่มี',
        'eye_tattoo:bottom' => 'สักขอบตาล่าง',
        'eye_tattoo:top' => 'สักขอบตาบน',
        'eye_tattoo:3d' => 'สักคิ้ว 3 มิติ',
        'eye_tattoo:eyelash' => 'ต่อขนตา',
        'vision_issue' => 'ปัญหาสายตา',
        'vision_issue:short' => 'สายตาสั้น',
        'vision_issue:long' => 'สายตายาว',
        'vision_issue:astigmatism' => 'สายตาเอียง',
        'eyelids_style_expectation' => 'ความสูงของชั้นตาที่ต้องการ',
        'eyelids_style_expectation:high' => 'ชั้นตาสูง',
        'eyelids_style_expectation:normal' => 'ชั้นตาธรรมชาติ',
        'eyelids_style_expectation:mini' => 'ชั้นตาเล็ก/หลบใน',
        'eyelids_style_expectation:follow_suggestions' => 'ชั้นตาตามคำแนะนำของแพทย์',
        'know_the_detail' => 'ทราบสารที่ฉีด',
        'brand' => 'ยี่ห้อ',
        'last_time' => 'ครั้งล่าสุดเมื่อ',
        'volume' => 'ปริมาณ',
        'size' => 'ขนาด',
        'place_or_doctor' => 'สถานที่/แพทย์',
        'presenting_complaint' => 'อาการที่เกิดขึ้น',
        'past_illness' => 'อาการป่วยในอดีต / การผ่าตัด',
        'present_illness' => 'อาการป่วยปัจจุบัน',
        'alcohol' => 'ดื่มแอลกอฮอล',
        'smoking' => 'สูบบุหรี่หรือไม่',
        'family_history_of_alopecia' => 'คุณหรือ คนในครอบครัวมีอารการผมร่วงเป็นหย่อมๆ หรือไม่',
        'finasteride' => 'Finasteride',
        'minoxidil' => 'Minoxidil',
        'men' => 'เพศชาย',
        'women' => 'เพศหญิง',
        'scalp' => 'Scalp',
        'erythena' => 'Erythena',
        'scarring' => 'Scarring',
        'scaling' => 'Scaling',
        'quality_of_donor_hair' => 'คุณภาพของบริเวณที่ย้ายรากผม',
        'fine' => 'ดี',
        'medium' => 'ปานกลาง',
        'coarse' => 'น้อย',
        'elasticity' => 'ความยืดหยุ่นของเส้นผม',
        'good' => 'ดี',
        'moderate' => 'ปานกลาง',
        'poor' => 'น้อย',
        'texture_of_the_hair' => 'ลักษณะของเส้นผม',
        'straight' => 'ตรง',
        'waves' => 'คลื่น / หยัก',
        'curl' => 'โค้ง',
        'color_of_the_hair' => 'สีของเส้นผม',
        'black' => 'ดำ',
        'brown' => 'น้ำตาล',
        'red' => 'แดง',
        'blonde' => 'บลอน',
        'donor' => 'Donor',
        'high' => 'High',
        'normal' => 'Normal',
        'low' => 'Low',
        'crisis' => 'Crisis',
        'which_surgical_you_looking_for' => 'ประเภทที่ต้องการทำ',
        'upper_eyelids_surgery' => 'กรีดตัดหนังตาบน ',
        'undereye_bag_surgery' => 'กรีดตัดหนังตาล่าง',
        'ptosis' => 'กล้ามเนื้อตาอ่อนแรง',
        'undereye_bag_surgery:small_incision' => 'ถุงใต้ตาแผลด้านใน',
        'upper_eyelids_surgery:small_incision' => 'ตาสองชั้น(แผลเล็ก)',
        'current_issue:eyebrow' => 'ปัญหาที่พบ (ช่วงคิ้ว)',
        'current_issue:eye' => 'ปัญหาที่พบ (ช่วงดวงตา)',
        'current_issue:wrinkle' => 'ปัญหาที่พบ (ริ้วรอย)',
        'low_space_eyebrow' => 'ช่วงคิ้วกับดวงตาแคบ',
        'uneven_eyebrow' => 'คิ้วไม่เท่ากัน',
        'tail_up_eyebrow' => 'หัวคิ้วตก',
        'tail_down_eyebrow' => 'หางคิ้วตก',
        'high_hair_line_eyebrow' => 'ไรผมสูง',
        'head_down_eye' => 'หัวตาตก',
        'head_up_eye' => 'หางตาตก',
        'single_eyelids' => 'ชั้นตาหลบใน',
        'uneven_eyelids' => 'ชั้นตาไม่เท่ากัน',
        'wrinkle_around_eye' => 'ริ้วรอยบริเวณหางตา',
        'wrinkle_around_eyelids' => 'ริ้วรอยบริเวณเปลือกตา',
        'wrinkle_under_eye' => 'ริ้วรอยใต้ตา',
        'forehead_wrinkle' => 'ริ้วรอยหน้าผาก',
        'wrinkle_when_frown' => 'ริ้วรอยขมวดคิ้ว',
        'body_scale' => 'สัดส่วนร่างกาย',
        'weight' => 'น้ำหนัก',
        'height' => 'ส่วนสูง',
        'bmi' => 'BMI',
        'occupation' => 'ท่านประกอบอาชีพอะไร',
        'big_event_in_this_year' => 'ท่านมีงานสำคัญในปีนี้หรือไม่',
        'adviser' => 'บุคคลที่ท่านปรึกษาและแสดงความคิดเห้น ทั้งก่อนและหลังผ่าตัด',
        'forehead_shape' => 'รูปแบบทรงหน้าผาก',
        'straight_forehead' => 'หน้าผากตรง',
        'wide_forehead' => 'หน้าผากกว้าง',
        'arched_forehead' => 'หน้าผากโค้ง',
        'sharp_forehead' => 'หน้าผากคลื่น',
        'double_arched_forehead' => 'หน้าผากโค้งคู่',
        'mountain_shaped_forehead' => 'หน้าผากสูง',
        'narrow_forehead' => 'หน้าผากงามแคบ',
        'hip_and_bottom_shape' => 'รูปแบบทรงสะโพกและก้น',
        'overall_flat_shape' => 'แบนโดยรวม',
        'upper_flat_shape' => 'แบนด้านบน',
        'side_flat_shape' => 'แบนด้านข้าง',
        'inner_flat_shape' => 'แบนด้านใน',
        'lower_flat_shape' => 'แบนด้านล่าง',
        'body_shape' => 'ลักษณะรูปร่าง',
        'sandglass_shape' => 'นาฬิกาทราย',
        'triangle_shape' => 'สามเหลี่ยม',
        'straight_shape' => 'ทรงตรง',
        'pear_shape' => 'ลูกแพร',
        'apple_shape' => 'แอปเปิ้ล'
    ];
    foreach($data as $key => $value){
        printf("<b>%s: </b><br/>", $words[$key]);
        if(is_array($value)){
            printf("<ol>");
            foreach($value as $li => $list_value){
                if(is_array($list_value)){
                    printf("<li><ul>");
                    foreach($list_value as $i => $nested_value){
                        printf("<li><b>%s: </b>%s</li>", $words[sprintf('%s[%s]', $key, $i)], $nested_value);
                    }
                    printf("</ul></li>");
                }else{
                    printf("<li>%s</li>", $list_value);
                }
            }
            printf("</ol>");
        }else{
            printf($value);
        }
        printf("<br/>");
    }
    die();
    */
    foreach($images as $key => $image){
        if(is_array($image)){
            foreach($image as $i => $file){
                $files[$key][$i] = ['path' => $file->path(), 'name' => sprintf("%s-%d.%s", $key, $i + 1, $file->extension())];
            }
        }else{
            $files[$key] = ['path' => $image->path(), 'name' => sprintf("%s.%s", $key, $image->extension())];
        }
    }
    Mail::to(['onlineconsult@masterpiececlinic.com', 'info@masterpiececlinic.com', 'international@masterpiececlinic.com'])->send(new SubmitForm($subject, $data, $files));
    return response()->json(['data'=>$data, 'files'=>$files, 'subject'=>$subject]);
});

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:api');
