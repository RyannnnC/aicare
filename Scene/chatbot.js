import React,{useContext, useEffect,useState} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, FlatList,Platform,AsyncStorage} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {styles} from '../style';
import DataContext from "../consumerContext";
import moment from 'moment-timezone';
import * as Localization from 'expo-localization';
import I18n from "./language"
import ChatBot from 'react-native-chatbot-expo';

export default function chatbot({navigation}) {
    const s=['']
    const steps = [
        {
          id: '0',
          message: 'Hi dear. I am Aicare Assistance. Before we start, can you tell me your name?',
          trigger: '10',
        },
        {id:"10",
    user:true,
    trigger:"11"
},{
    id:"11",
    message:({ previousValue, steps }) => 'I see. Can you tell me about your gender? ',
    trigger:"12"
},
{id:"12",
options: [
    { value: 1, label: "Male", trigger: '13' },
    { value: 2, label: 'Female', trigger: '13' },
    { value: 3, label: 'Not the aboves', trigger: '13' },
  ],},
  {id:"13",
message:"Got you. Could you tell me your age?",
trigger:"14",
},
{id:"14",
user:true,
trigger:"20"},
        {id:"20",
    message:"Which part of your body does not feel right?",
trigger:"21"},{
id:"21",
options: [
  { value: 1, label: "arm", trigger: '201' },
  { value: 2, label: 'chest',trigger: '202' },
  { value: 3, label: 'ear', trigger: '203' },
  { value: 4, label: "eye", trigger: '204' },
  { value: 5, label: 'foot',trigger: '205' },
  { value: 6, label: 'hand', trigger: '206' },
  { value: 7, label: "head", trigger: '207' },
  { value: 8, label: 'hip',trigger: '208' },
  { value: 9, label: 'leg', trigger: '209' },
  { value: 10, label: "lower abdomen", trigger: '210' },
  { value: 11, label: 'mouth',trigger: '211' },
  { value: 12, label: 'neck', trigger: '212' },
  { value: 13, label: 'nose', trigger: '213' },
  { value: 14, label: 'shoulder',trigger: '214' },
]
},
        {id: '201',
        message: 'Could your choose your symptoms?',
        trigger: '101',

        },{id: '202',
        message: 'Could your choose your symptoms?',
        trigger: '102',

        },
        {id: '203',
        message: 'Could your choose your symptoms?',
        trigger: '103',

        },{id: '204',
        message: 'Could your choose your symptoms?',
        trigger: '104',

        },{id: '205',
        message: 'Could your choose your symptoms?',
        trigger: '105',

        },{id: '206',
        message: 'Could your choose your symptoms?',
        trigger: '106',

        },{id: '207',
        message: 'Could your choose your symptoms?',
        trigger: '107',

        },{id: '208',
        message: 'Could your choose your symptoms?',
        trigger: '108',

        },{id: '209',
        message: 'Could your choose your symptoms?',
        trigger: '109',

        },{id: '210',
        message: 'Could your choose your symptoms?',
        trigger: '110',

        },{id: '211',
        message: 'Could your choose your symptoms?',
        trigger: '111',

        },{id: '212',
        message: 'Could your choose your symptoms?',
        trigger: '112',

        },{id: '213',
        message: 'Could your choose your symptoms?',
        trigger: '113',

        },{id: '214',
        message: 'Could your choose your symptoms?',
        trigger: '114',

        },{id:"101",
        options: [
          { value: 1, label: "Arm numbness", trigger: '2' },
          { value: 2, label: 'Arm pain',trigger: '2' },
          { value: 3, label: 'Arm paralysis', trigger: '2' },
          { value: 4, label: "Arm swelling", trigger: '2' },
          { value: 5, label: 'Arm weakness',trigger: '2' },
          { value: 6, label: 'Arms tingling', trigger: '2' },
          { value: 7, label: "Can't straighten elbow", trigger: '2' },
          { value: 8, label: 'Clonus',trigger: '2' },
          { value: 9, label: 'Cold extremities', trigger: '2' },
          { value: 10, label: "Contracture", trigger: '2' },
          { value: 11, label: "Elbow deformity",trigger: '2' },
          { value: 12, label: "Elbow pain", trigger: '2' },
          { value: 13, label: "Elbow tenderness", trigger: '2' },
          { value: 14, label: "Increased reflexes", trigger: '2' },
          { value: 15, label: "Joint bleeding",trigger: '2' },
          { value: 16, label: "Joint hypermobility", trigger: '2' },

          { value: 17, label: 'Joint locking or catching', trigger: '2' },
          { value: 18, label: "Joint stiffness", trigger: '2' },
          { value: 19, label: "Joint swelling",trigger: '2' },
          { value: 20, label: "Limb pain", trigger: '2' },
          { value: 21, label: "Limb spasms", trigger: '2' },
          { value: 22, label: "Popping or snapping sound from joint", trigger: '2' },
          { value: 23, label: "Popping or snapping sound from shoulder joint",trigger: '2' },
          { value: 24, label: "Rash in armpit", trigger: '2' },

          { value: 25, label: "Stiff joints", trigger: '2' },
          { value: 26, label: "Stiffness of the limbs", trigger: '2' },
          { value: 27, label: "Visible deformity of shoulder", trigger: '2' },
          { value: 28, label: "Wrist nodule",trigger: '2' },
          { value: 29, label: "Wrist pain", trigger: '2' },
        ]
      },{id:"102",
      options: [
        { value: 1, label: "Angina", trigger: '2' },
        { value: 2, label: 'Apnea',trigger: '2' },
        { value: 3, label: 'Breast Lump', trigger: '2' },
        { value: 4, label: "Breast Swelling", trigger: '2' },
        { value: 6, label: 'Chest congestion', trigger: '2' },
        { value: 7, label: "Chest deformity", trigger: '2' },
        { value: 8, label: 'Chest pain or discomfort',trigger: '2' },
        { value: 9, label: 'Chest tightness', trigger: '2' },
        { value: 10, label: "Chest wall pain", trigger: '2' },
        { value: 11, label: "Chest wall tenderness",trigger: '2' },
        { value: 12, label: "Cough", trigger: '2' },
        { value: 13, label: "Cough, no sputum(non-productive", trigger: '2' },
        { value: 14, label: "Episodes of not breathing during sleep", trigger: '2' },
        { value: 15, label: "Fluid in the lungs",trigger: '2' },
        { value: 16, label: "Heart palpitations", trigger: '2' },

        { value: 17, label: 'High pitched cry', trigger: '2' },
        { value: 18, label: "Hyperventilation syndrome", trigger: '2' },
        { value: 19, label: "Irregular heartbeat",trigger: '2' },
        { value: 20, label: "Nipple discharge", trigger: '2' },
        { value: 21, label: "Noisy breathing", trigger: '2' },
        { value: 22, label: "Pigeon chest", trigger: '2' },
        { value: 23, label: "Rapid breathing",trigger: '2' },
        { value: 24, label: "Rapid heart rate", trigger: '2' },

        { value: 25, label: "Rash on chest", trigger: '2' },
        { value: 26, label: "Shortness of breath", trigger: '2' },
        { value: 27, label: "Slow heart rate", trigger: '2' },
        { value: 28, label: "Slow or irregular breathing",trigger: '2' },
        { value: 29, label: "Snoring", trigger: '2' },
        { value: 30, label: "Wheezing", trigger: '2' },

      ]
    },{id:"103",
    options: [
      { value: 1, label: "Auditory hallucination", trigger: '2' },
      { value: 2, label: 'Bulging eardrum',trigger: '2' },
      { value: 3, label: 'Difficulty understanding speech', trigger: '2' },
      { value: 4, label: "Discharge from the ear", trigger: '2' },
      { value: 6, label: 'Ear ache', trigger: '2' },
      { value: 7, label: "Ear deformities", trigger: '2' },
      { value: 8, label: 'Ear itch',trigger: '2' },
      { value: 9, label: 'Ear lump or bulge', trigger: '2' },
      { value: 10, label: "Ear pressure", trigger: '2' },
      { value: 11, label: "Ear tenderness to touch",trigger: '2' },
      { value: 12, label: "Hearing difficulties", trigger: '2' },
      { value: 13, label: "Hearing loss", trigger: '2' },
      { value: 14, label: "Hearing voices", trigger: '2' },
      { value: 15, label: "Low set ears",trigger: '2' },
      { value: 16, label: "Malformed ears", trigger: '2' },

      { value: 17, label: 'Red ear drum', trigger: '2' },
      { value: 18, label: "Ringing in ears", trigger: '2' },
      { value: 19, label: "Sensitive hearing",trigger: '2' },
      { value: 20, label: "Sensitive to noise", trigger: '2' },

    ]
  },{id:"104",
  options: [
    { value: 1, label: "Aura", trigger: '2' },
    { value: 2, label: 'Blank stare',trigger: '2' },
    { value: 3, label: 'Bleeding in eye', trigger: '2' },
    { value: 4, label: "Blinking eyes", trigger: '2' },
    { value: 5, label: 'Blue sclera',trigger: '2' },
    { value: 6, label: 'Changing in vision', trigger: '2' },
    { value: 7, label: "Cloudy or blurry vision", trigger: '2' },
    { value: 8, label: 'Color blindness',trigger: '2' },
    { value: 9, label: 'Dark circle under eyes', trigger: '2' },
    { value: 10, label: "Decreased night vision", trigger: '2' },
    { value: 11, label: "Decreased tears when crying",trigger: '2' },
    { value: 12, label: "Difficulty reading", trigger: '2' },
    { value: 13, label: "Discharge or mucus in eyes", trigger: '2' },
    { value: 14, label: "Double vision", trigger: '2' },
    { value: 15, label: "Drooping eyelid",trigger: '2' },
    { value: 16, label: "Enlarged(dilated) pupils", trigger: '2' },

    { value: 17, label: 'Eye fatigue', trigger: '2' },
    { value: 18, label: "Eye floaters", trigger: '2' },
    { value: 19, label: "Eye irritation",trigger: '2' },
    { value: 20, label: "Eye movement problem", trigger: '2' },
    { value: 21, label: "Eye pain", trigger: '2' },
    { value: 22, label: "Eyelashes falling out", trigger: '2' },
    { value: 23, label: "Eyelid injury",trigger: '2' },
    { value: 24, label: "Eyelid redness", trigger: '2' },

    { value: 25, label: "Eyelid swelling", trigger: '2' },
    { value: 26, label: "Eyes rolling back", trigger: '2' },
    { value: 27, label: "Flickering lights in vision", trigger: '2' },
    { value: 28, label: "Frequent changes in eye-glass prescription",trigger: '2' },
    { value: 29, label: "Impaired color vision", trigger: '2' },

    { value: 30, label: "Inability to recognize objects", trigger: '2' },
    { value: 31, label: 'Inability to recognize people',trigger: '2' },
    { value: 32, label: 'Itchy eyes', trigger: '2' },
    { value: 33, label: "Light sensitivity", trigger: '2' },
    { value: 34, label: 'Need brighter light to read',trigger: '2' },
    { value: 35, label: 'Night blindness', trigger: '2' },
    { value: 36, label: "Purple rash around eyes", trigger: '2' },
    { value: 37, label: 'Red or bloodshot eyes',trigger: '2' },
    { value: 38, label: 'Sensation of something in eye', trigger: '2' },
    { value: 39, label: "Shadow over part of vision", trigger: '2' },
    { value: 40, label: "Sleepiness",trigger: '2' },
    { value: 41, label: "Small(constricted) pupils", trigger: '2' },
    { value: 42, label: "Squinting", trigger: '2' },
    { value: 43, label: "Sudden flash of lights", trigger: '2' },
    { value: 44, label: "Sunken eyes",trigger: '2' },
    { value: 45, label: "Swelling around eyes", trigger: '2' },

    { value: 46, label: 'Unequal pupils(size)', trigger: '2' },
    { value: 47, label: "Unintentional loss of outside 1/3 of eyebrow", trigger: '2' },
    { value: 48, label: "Vision loss",trigger: '2' },
    { value: 49, label: "Visual disturbances", trigger: '2' },
    { value: 50, label: "Visual halos around lights", trigger: '2' },
    { value: 51, label: "Watery eyes", trigger: '2' },

  ]
},{id:"105",
options: [
  { value: 1, label: "Ankle pain", trigger: '2' },
  { value: 2, label: 'Ankle stiffness',trigger: '2' },
  { value: 3, label: 'Ankle swelling', trigger: '2' },
  { value: 4, label: "Ankle weakness", trigger: '2' },
  { value: 5, label: 'Big toe bent',trigger: '2' },
  { value: 6, label: 'Big toe pain', trigger: '2' },
  { value: 7, label: "Clonus", trigger: '2' },
  { value: 8, label: 'Cold extremities',trigger: '2' },
  { value: 9, label: 'Cold feet', trigger: '2' },
  { value: 10, label: "Contracture", trigger: '2' },
  { value: 11, label: "Flatfeet",trigger: '2' },
  { value: 12, label: "Foot deformity", trigger: '2' },
  { value: 13, label: "Foot numbness", trigger: '2' },
  { value: 14, label: "Foot redness", trigger: '2' },
  { value: 15, label: "Foot tingling",trigger: '2' },
  { value: 16, label: "Foul smelling discharge from foot", trigger: '2' },

  { value: 17, label: 'Heel pain', trigger: '2' },
  { value: 18, label: "Heel spur", trigger: '2' },
  { value: 19, label: "High arches",trigger: '2' },
  { value: 20, label: "Increased reflexes", trigger: '2' },
  { value: 21, label: "Joint bleeding", trigger: '2' },
  { value: 22, label: "Joint hypermobility", trigger: '2' },
  { value: 23, label: "Joint locking or catching",trigger: '2' },
  { value: 24, label: "Joint stiffness", trigger: '2' },

  { value: 25, label: "Joint swelling", trigger: '2' },
  { value: 26, label: "Limb pain", trigger: '2' },
  { value: 27, label: "Limb spasms", trigger: '2' },
  { value: 28, label: "Pain in ball of foot",trigger: '2' },
  { value: 29, label: "Popping or snapping sound from joint", trigger: '2' },

  { value: 30, label: "Small feet", trigger: '2' },
  { value: 31, label: 'Smelly feet',trigger: '2' },
  { value: 32, label: 'Stiff joints', trigger: '2' },
  { value: 33, label: "Stiffness of the limbs", trigger: '2' },
  { value: 34, label: 'Thickened fingers or toes(Sclerodactyly)',trigger: '2' },
  { value: 35, label: 'Toe swelling', trigger: '2' },
  { value: 36, label: "Toe tenderness", trigger: '2' },
  { value: 37, label: 'Unable to bend foot down',trigger: '2' },
  

]
},{id:"106",
options: [
  { value: 1, label: "Brittle fingernails", trigger: '2' },
  { value: 2, label: 'Clammy hands',trigger: '2' },
  { value: 3, label: 'Clenched hands', trigger: '2' },
  { value: 4, label: "Clonus", trigger: '2' },
  { value: 5, label: 'Cold extremities',trigger: '2' },
  { value: 6, label: 'Cold hands', trigger: '2' },
  { value: 7, label: "Contracture", trigger: '2' },
  { value: 8, label: 'Enlarged finger tips',trigger: '2' },
  { value: 9, label: 'Finger deformity', trigger: '2' },
  { value: 10, label: "Finger Numbness", trigger: '2' },
  { value: 11, label: "Finger pain",trigger: '2' },
  { value: 12, label: "Finger pop", trigger: '2' },
  { value: 13, label: "Finger stiffness", trigger: '2' },
  { value: 14, label: "Finger Swelling", trigger: '2' },
  { value: 15, label: "Finger tenderness",trigger: '2' },
  { value: 16, label: "Finger tingling", trigger: '2' },

  { value: 17, label: 'Finger ulcers', trigger: '2' },
  { value: 18, label: "Finger weakness", trigger: '2' },
  { value: 19, label: "Finger deformity",trigger: '2' },
  { value: 20, label: "Hand numbness", trigger: '2' },
  { value: 21, label: "Hand pain", trigger: '2' },
  { value: 22, label: "Hand Swelling", trigger: '2' },
  { value: 23, label: "Hand tingling",trigger: '2' },
  { value: 24, label: "Hand weakness", trigger: '2' },

  { value: 25, label: "Hand increased reflexes", trigger: '2' },
  { value: 26, label: "Joint bleeding", trigger: '2' },
  { value: 27, label: "Joint hypermobility", trigger: '2' },
  { value: 28, label: "Joint locking or catching",trigger: '2' },
  { value: 29, label: "Joint stiffness", trigger: '2' },

  { value: 30, label: "Joint swelling", trigger: '2' },
  { value: 31, label: 'Large hands',trigger: '2' },
  { value: 32, label: 'Limb pain', trigger: '2' },
  { value: 33, label: "Limb spasms", trigger: '2' },
  { value: 34, label: 'Palm nodules',trigger: '2' },
  { value: 35, label: 'Popping or napping sound from joint', trigger: '2' },
  { value: 36, label: "Rash on finger webbing", trigger: '2' },
  { value: 37, label: 'Really long fingers',trigger: '2' },
  { value: 38, label: 'Red or black spots on fingernail', trigger: '2' },
  { value: 39, label: "Red Palms", trigger: '2' },
  { value: 40, label: "Shaking hands or tremor",trigger: '2' },
  { value: 41, label: "Single palm crease", trigger: '2' },
  { value: 42, label: "Skin rash over finger joints", trigger: '2' },
  { value: 43, label: "Small hands ", trigger: '2' },
  { value: 44, label: "Stiff joints",trigger: '2' },
  { value: 45, label: "Stiffness of the limbs", trigger: '2' },

  { value: 46, label: 'Thickened fingers or toes(Sclerodactyly)', trigger: '2' },
  { value: 47, label: "Thickened skin on fingers", trigger: '2' },
  { value: 48, label: "Unable to bear weight",trigger: '2' },
  { value: 49, label: "Unable to grip(hands)", trigger: '2' },
  { value: 50, label: "Unusually short fourth fingers", trigger: '2' },
  { value: 51, label: "Upward curving of nails", trigger: '2' },

  { value: 52, label: 'Wrist nodule', trigger: '2' },
  { value: 53, label: "Wrist pain", trigger: '2' },
  { value: 54, label: "Wrist weakness",trigger: '2' },
]
},{id:"107",
options: [
  { value: 1, label: "Agitation", trigger: '2' },
  { value: 2, label: 'Apathy',trigger: '2' },
  { value: 3, label: 'Bad taste in mouth', trigger: '2' },
  { value: 4, label: "Balance problems", trigger: '2' },
  { value: 5, label: 'Behaviour problems',trigger: '2' },
  { value: 6, label: 'Binging and purging', trigger: '2' },
  { value: 7, label: "Blackouts", trigger: '2' },
  { value: 8, label: 'Crawling sensation on head',trigger: '2' },
  { value: 9, label: 'Delirium', trigger: '2' },
  { value: 10, label: "Delusions", trigger: '2' },
  { value: 11, label: "Delusions of grandeur",trigger: '2' },
  { value: 12, label: "Difficulty concentration", trigger: '2' },
  { value: 13, label: "Difficulty finding words", trigger: '2' },
  { value: 14, label: "Difficulty staying awake during day", trigger: '2' },
  { value: 15, label: "Difficulty thinking",trigger: '2' },
  { value: 16, label: "Difficulty understanding speech", trigger: '2' },

  { value: 17, label: 'Dry hair', trigger: '2' },
  { value: 18, label: "Dyskinesia", trigger: '2' },
  { value: 19, label: "Euphoria",trigger: '2' },
  { value: 20, label: "Fainting", trigger: '2' },
  { value: 21, label: "Fainting from exertion", trigger: '2' },
  { value: 22, label: "Fatigue", trigger: '2' },
  { value: 23, label: "Fear of embarrassment",trigger: '2' },
  { value: 24, label: "Feeling anxious", trigger: '2' },

  { value: 25, label: "Feeling depressed", trigger: '2' },
  { value: 26, label: "Feeling of unfinished defecation", trigger: '2' },
  { value: 27, label: "Fever", trigger: '2' },
  { value: 28, label: "Flaking skin on scalp",trigger: '2' },
  { value: 29, label: "Flashbacks", trigger: '2' },

  { value: 30, label: "Frightening thoughts", trigger: '2' },
  { value: 31, label: 'Head Tremor',trigger: '2' },
  { value: 32, label: 'Headache', trigger: '2' },
  { value: 33, label: "Hopelessness", trigger: '2' },
  { value: 34, label: 'Impulsive or reckless behaviour',trigger: '2' },
  { value: 35, label: 'Inability to recognize objects', trigger: '2' },
  { value: 36, label: "Inability to recognize people", trigger: '2' },
  { value: 37, label: 'Inattention',trigger: '2' },
  { value: 38, label: 'Increased talkativeness', trigger: '2' },
  { value: 39, label: "Irrational fear or phobia", trigger: '2' },
  { value: 40, label: "Itchy scalp",trigger: '2' },
  { value: 41, label: "Loss of consciousness", trigger: '2' },
  { value: 42, label: "Loss of temper", trigger: '2' },
  { value: 43, label: "Low self esteem", trigger: '2' },
  { value: 44, label: "Memory problem",trigger: '2' },
  { value: 45, label: "Nervousness", trigger: '2' },

  { value: 46, label: 'Overeacting', trigger: '2' },
  { value: 47, label: "Panic attack", trigger: '2' },
  { value: 48, label: "Paranoid behavior",trigger: '2' },
  { value: 49, label: "Paranoid delusions", trigger: '2' },
  { value: 50, label: "Personality changes", trigger: '2' },
  { value: 51, label: "Pimples", trigger: '2' },

  { value: 52, label: 'Poor judgement', trigger: '2' },
  { value: 53, label: "Preoccupation with physical appearance", trigger: '2' },
  { value: 54, label: "Rash on scalp",trigger: '2' },

  { value: 55, label: 'Sadness', trigger: '2' },
  { value: 56, label: "Scalp tenderness", trigger: '2' },
  { value: 57, label: "Self centeredness",trigger: '2' },
  { value: 58, label: "Sense of impending doom", trigger: '2' },
  { value: 59, label: "Sensory loss", trigger: '2' },
  { value: 60, label: "Shyness", trigger: '2' },

  { value: 61, label: 'Sinus pain', trigger: '2' },
  { value: 62, label: "Sleepiness", trigger: '2' },
  { value: 63, label: "Slow thinking",trigger: '2' },

  { value: 64, label: 'Small head', trigger: '2' },
  { value: 65, label: "Soft spot on head bulging", trigger: '2' },
  { value: 66, label: "Spasticity",trigger: '2' },
  { value: 67, label: "Suicidal thoughts", trigger: '2' },
  { value: 68, label: "Sunken soft spot on top of head", trigger: '2' },
  { value: 69, label: "Thin hair", trigger: '2' },

  { value: 70, label: 'Trouble sleeping', trigger: '2' },
  { value: 71, label: "White specks on scalp or hair", trigger: '2' },
]
},{id:"108",
options: [
  { value: 1, label: "Difficulty walking", trigger: '2' },
  { value: 2, label: 'Hip muscle weakness',trigger: '2' },
  { value: 3, label: 'Hip pain', trigger: '2' },
  { value: 4, label: "Hip stiffness", trigger: '2' },
  { value: 6, label: 'Limited Hip movement', trigger: '2' },
]
},{id:"109",
options: [
  { value: 1, label: "Ankle pain", trigger: '2' },
  { value: 2, label: 'Ankle stiffness',trigger: '2' },
  { value: 3, label: 'Ankle swelling', trigger: '2' },
  { value: 4, label: "Ankle weakness", trigger: '2' },
  { value: 5, label: 'Bow legs',trigger: '2' },
  { value: 6, label: 'Calf pain', trigger: '2' },
  { value: 7, label: "Calf swelling", trigger: '2' },
  { value: 8, label: 'Clonus',trigger: '2' },
  { value: 9, label: 'Cold extremities', trigger: '2' },
  { value: 10, label: "Contracture", trigger: '2' },
  { value: 11, label: "Difficulty climbing stairs",trigger: '2' },
  { value: 12, label: "Difficulty getting up from a chair", trigger: '2' },
  { value: 13, label: "Difficulty walking", trigger: '2' },
  { value: 14, label: "Increased reflexes", trigger: '2' },
  { value: 15, label: "Joint bleeding",trigger: '2' },
  { value: 16, label: "Joint locking or catching", trigger: '2' },

  { value: 17, label: 'Joint stiffness', trigger: '2' },
  { value: 18, label: "Joint swelling", trigger: '2' },
  { value: 19, label: "Knee buckling",trigger: '2' },
  { value: 20, label: "Knee deformity", trigger: '2' },
  { value: 21, label: "Knee pain", trigger: '2' },
  { value: 22, label: "Knee swelling", trigger: '2' },
  { value: 23, label: "Knee weakness",trigger: '2' },
  { value: 24, label: "Leg numbness", trigger: '2' },

  { value: 25, label: "Leg pain", trigger: '2' },
  { value: 26, label: "Leg pain with exertion", trigger: '2' },
  { value: 27, label: "Leg paralysis", trigger: '2' },
  { value: 28, label: "Leg swelling",trigger: '2' },
  { value: 29, label:"Leg tenderness", trigger: '2' },

  { value: 30, label: "Leg tingling", trigger: '2' },
  { value: 31, label: 'Leg weakness',trigger: '2' },
  { value: 32, label: 'Legs cramping', trigger: '2' },
  { value: 33, label: "Limb pain", trigger: '2' },
  { value: 34, label: 'Limb spasms',trigger: '2' },
  { value: 35, label: 'Lower leg pain', trigger: '2' },
  { value: 36, label: "Lower leg swelling", trigger: '2' },
  { value: 37, label: 'Nodules on shins',trigger: '2' },
  { value: 38, label: 'Pain shooting down the leg', trigger: '2' },
  { value: 39, label: "Popping or snapping sound from joint", trigger: '2' },
  { value: 40, label: "Short stature",trigger: '2' },
  { value: 41, label: "Stiff joints", trigger: '2' },
  { value: 42, label: "Stiff knee", trigger: '2' },
  { value: 43, label: "Stiffness of the limbs", trigger: '2' },
  { value: 44, label: "Thigh numbness",trigger: '2' },
  { value: 45, label: "Thigh rash", trigger: '2' },

  { value: 46, label: 'Unable to bear weight', trigger: '2' },
]
},{id:"110",
options: [
  { value: 1, label: "Abdominal discomfort", trigger: '2' },
  { value: 2, label: 'Abdominal mass',trigger: '2' },
  { value: 3, label: 'Abdominal obesity', trigger: '2' },
  { value: 4, label: "Abdominal pain", trigger: '2' },
  { value: 5, label: 'Abdominal skin redness',trigger: '2' },
  { value: 6, label: 'Abdominal spasm', trigger: '2' },
  { value: 7, label: "Abdominal fluid buildup in abdomen", trigger: '2' },
  { value: 8, label: 'Aching muscles',trigger: '2' },
  { value: 9, label: 'Back pain', trigger: '2' },
  { value: 10, label: "Black tarry stools", trigger: '2' },
  { value: 11, label: "Bloating or abdominal fullness",trigger: '2' },
  { value: 12, label: "Bloody stools", trigger: '2' },
  { value: 13, label: "Bowel incontinence", trigger: '2' },
  { value: 14, label: "Burping", trigger: '2' },
  { value: 15, label: "Clay colored stool",trigger: '2' },
  { value: 16, label: "Constipation", trigger: '2' },

  { value: 17, label: 'Curved spine', trigger: '2' },
  { value: 18, label: "Diarrhea", trigger: '2' },
  { value: 19, label: "Enlarged liver",trigger: '2' },
  { value: 20, label: "Enlarged spleen", trigger: '2' },
  { value: 21, label: "Fatty stool", trigger: '2' },
  { value: 22, label: "Feeling of unfinished defecation", trigger: '2' },
  { value: 23, label: "Foul smelling stools",trigger: '2' },
  { value: 24, label: "Gastrointestinal disturbances", trigger: '2' },

  { value: 25, label: "Gray stool", trigger: '2' },
  { value: 26, label: "Holding bowel movements", trigger: '2' },
  { value: 27, label: "Kidney cyst", trigger: '2' },
  { value: 28, label: "Leaking urine",trigger: '2' },
  { value: 29, label:"Lower abdominal pain", trigger: '2' },

  { value: 30, label: "Lower back stiffness", trigger: '2' },
  { value: 31, label: 'Mucus in stool',trigger: '2' },
  { value: 32, label: 'Nausea', trigger: '2' },
  { value: 33, label: "Obstipation", trigger: '2' },
  { value: 34, label: 'Painful bowel movements',trigger: '2' },
  { value: 35, label: 'Passing gas', trigger: '2' },
  { value: 36, label: "Pulsatile mass", trigger: '2' },
  { value: 37, label: 'Rash on back',trigger: '2' },
  { value: 38, label: 'Rectal bleeding', trigger: '2' },
  { value: 39, label: "Side pain", trigger: '2' },
  { value: 40, label: "Stomach cramps",trigger: '2' },
  { value: 41, label: "Stomach upset", trigger: '2' },
  { value: 42, label: "Stretch marks", trigger: '2' },
  { value: 43, label: "Swollen abdomen", trigger: '2' },
  { value: 44, label: "Tender abdomen",trigger: '2' },
  { value: 45, label: "Thin or narrow stools", trigger: '2' },

  { value: 46, label: 'Upper abdominal pain', trigger: '2' },
  { value: 47, label: "Vomiting", trigger: '2' },
]
},{id:"111",
options: [
  { value: 1, label: "Bad breath", trigger: '2' },
  { value: 2, label: 'Bad taste in mouth',trigger: '2' },
  { value: 3, label: 'Binging and purging', trigger: '2' },
  { value: 4, label: "Bitter almond odor on breath", trigger: '2' },
  { value: 5, label: 'Bitter/acid taste in mouth',trigger: '2' },
  { value: 6, label: 'Bleeding gums', trigger: '2' },
  { value: 7, label: "Blisters in the mouth", trigger: '2' },
  { value: 8, label: 'Burping',trigger: '2' },
  { value: 9, label: 'Cheek lump or bulge', trigger: '2' },
  { value: 10, label: "Check swelling", trigger: '2' },
  { value: 11, label: "Cleft lip",trigger: '2' },
  { value: 12, label: "Clicking or popping sound from jaw", trigger: '2' },
  { value: 13, label: "Cough", trigger: '2' },
  { value: 14, label: "Damaged tooth enamel", trigger: '2' },
  { value: 15, label: "Decreased taste",trigger: '2' },
  { value: 16, label: "Delayed tooth eruption", trigger: '2' },

  { value: 17, label: 'Drooling', trigger: '2' },
  { value: 18, label: "Episodes of not breathing during sleep", trigger: '2' },
  { value: 19, label: "Extra saliva",trigger: '2' },
  { value: 20, label: "Feeding difficulties", trigger: '2' },
  { value: 21, label: "Food getting stuck(swallowing)", trigger: '2' },
  { value: 22, label: "Fruity odor on breath", trigger: '2' },
  { value: 23, label: "Grinding teeth",trigger: '2' },
  { value: 24, label: "Gum pain", trigger: '2' },

  { value: 25, label: "Gum sores", trigger: '2' },
  { value: 26, label: "Gum swelling", trigger: '2' },
  { value: 27, label: "Hiccups", trigger: '2' },
  { value: 28, label: "High pitch cry",trigger: '2' },
  { value: 29, label: "Increased speech volume", trigger: '2' },

  { value: 30, label: "Large mouth", trigger: '2' },
  { value: 31, label: 'Lip blister',trigger: '2' },
  { value: 32, label: 'Loss of speech', trigger: '2' },
  { value: 33, label:"Misaligned teeth", trigger: '2' },
  { value: 34, label: 'Missing teeth',trigger: '2' },
  { value: 35, label: 'Mouth tingling', trigger: '2' },
  { value: 36, label: "Narrow palate", trigger: '2' },
  { value: 37, label: 'Noisy breathing',trigger: '2' },
  { value: 38, label: 'Overeacting', trigger: '2' },
  { value: 39, label: "Painful cracks at the corners of the mouth", trigger: '2' },
  { value: 40, label: "Presistent mouth sore",trigger: '2' },
  { value: 41, label: "Rapid speech", trigger: '2' },
  { value: 42, label: "Rash with red bumps around mouth", trigger: '2' },
  { value: 43, label: "Receding gums", trigger: '2' },
  { value: 44, label: "Red gums",trigger: '2' },
  { value: 45, label: "Regurgitation of food or liquid", trigger: '2' },

  { value: 46, label: 'Repeats phrases', trigger: '2' },
  { value: 47, label: "Sensation of strange smell", trigger: '2' },
  { value: 48, label: "Sensitive gums",trigger: '2' },
  { value: 49, label: "Sensitive teeth", trigger: '2' },
  { value: 50, label: "Sneezing", trigger: '2' },
  { value: 51, label: "Snoring", trigger: '2' },

  { value: 52, label: 'Speech difficulty', trigger: '2' },
  { value: 53, label: "Sudden attacks of crying", trigger: '2' },
  { value: 54, label: "Swollen lip",trigger: '2' },

  { value: 55, label: 'Swollen mouth', trigger: '2' },
  { value: 56, label: "Thick saliva or mucus", trigger: '2' },
  { value: 57, label: "Thirsty",trigger: '2' },
  { value: 58, label: "Tongue problems", trigger: '2' },
  { value: 59, label: "Toothache", trigger: '2' },
  { value: 60, label: "Unable to open mouth(jaw)", trigger: '2' },

  { value: 61, label: 'Uncontrollable verbal outbursts', trigger: '2' },
  { value: 62, label: "Vomiting", trigger: '2' },
  { value: 63, label: "Wheezing",trigger: '2' },

  { value: 64, label: 'White patches inside mouth', trigger: '2' },
]
},{id:"112",
options: [
  { value: 1, label: "Back pain", trigger: '2' },
  { value: 2, label: 'Bulging neck veins',trigger: '2' },
  { value: 3, label: 'Change in voice', trigger: '2' },
  { value: 4, label: "Choking on food", trigger: '2' },
  { value: 5, label: 'Cough',trigger: '2' },
  { value: 6, label: 'Difficulty swallowing', trigger: '2' },
  { value: 7, label: "Enlarged thyroid gland", trigger: '2' },
  { value: 8, label: 'Feeling of lump in throat',trigger: '2' },
  { value: 9, label: 'Gagging', trigger: '2' },
  { value: 10, label: "Headache", trigger: '2' },
  { value: 11, label: "Hoarse voice",trigger: '2' },
  { value: 12, label: "Hunched or stooped posture", trigger: '2' },
  { value: 13, label: "Loss of voice", trigger: '2' },
  { value: 14, label: "Lump or bulge on throat", trigger: '2' },
  { value: 15, label: "Neck lump or bulge",trigger: '2' },
  { value: 16, label: "Neck pain", trigger: '2' },

  { value: 17, label: 'Neck strain', trigger: '2' },
  { value: 18, label: "Neck swelling", trigger: '2' },
  { value: 19, label: "Pain when swallowing",trigger: '2' },
  { value: 20, label: "Painful throat sores", trigger: '2' },
  { value: 21, label: "Pimples", trigger: '2' },
  { value: 22, label: "Reduced spinal flexibility", trigger: '2' },
  { value: 23, label: "Snoring",trigger: '2' },
  { value: 24, label: "Sore throat", trigger: '2' },

  { value: 25, label: "Spots on throat", trigger: '2' },
  { value: 26, label: "Swollen throat", trigger: '2' },
  { value: 27, label: "Swollen glands", trigger: '2' },
  { value: 28, label: "Swollen tonsils",trigger: '2' },
  { value: 29, label: "Throat tightness", trigger: '2' },

  { value: 30, label: "Vocal cord strain", trigger: '2' },
 
]
},{id:"113",
options: [
  { value: 1, label: "Bloody nose", trigger: '2' },
  { value: 2, label: 'Difficulty breathing through nose',trigger: '2' },
  { value: 3, label: 'Lack of sense of smell', trigger: '2' },
  { value: 4, label: "Nasal congestion", trigger: '2' },
  { value: 5, label: 'Pimples',trigger: '2' },
  { value: 6, label: 'Post nasal drip', trigger: '2' },
  { value: 7, label: "Runny nose", trigger: '2' },
  { value: 8, label: 'Sinus pain',trigger: '2' },
  { value: 9, label: 'Sneezing', trigger: '2' },
  { value: 10, label: "Snoring", trigger: '2' },
 
]
},{id:"114",
options: [
  { value: 1, label: "Cold extremities", trigger: '2' },
  { value: 2, label: 'Contracture',trigger: '2' },
  { value: 3, label: 'Increased reflexes', trigger: '2' },
  { value: 4, label: "Joint bleeding", trigger: '2' },
  { value: 5, label: 'Joint hypermobility',trigger: '2' },
  { value: 6, label: 'Joint locking or catching', trigger: '2' },
  { value: 7, label: "Joint stiffness", trigger: '2' },
  { value: 8, label: 'Joint swelling',trigger: '2' },
  { value: 9, label: 'Limb pain', trigger: '2' },
  { value: 10, label: "Limb spasms", trigger: '2' },
  { value: 11, label: "Popping or snappings sound from joint",trigger: '2' },
  { value: 12, label: "Shoulder pain", trigger: '2' },
  { value: 13, label: "Muscle weakness", trigger: '2' },
  { value: 14, label: "Shoulder stiffness", trigger: '2' },
  { value: 15, label: "Stiff joints",trigger: '2' },
  { value: 16, label: "Unable to bear weight", trigger: '2' },

]
},
        {id:"15",
    user:true,
trigger:"2"},

        {
          id: '2',
          message: 'Do you have any additional symptoms you want to share?',
          trigger: '16',

        },

        {id:"16",
    user:true,
trigger:"3"},

        {id:"3",
    message:"Do you have any additional details, such as allergies and medication, you want to share?",
    trigger: '17',
},

{id:"17",
user:true,
trigger:"4"},

{id:"4",
message:"Thank you for the info. We have successfully saved your symptoms in your profile. This session is over, please navigate to homepage.",
end:true
}
    ,

      ];
  
    const checkToken=()=>{
      if (user.token==-1){
        return true
      }else{
        return false
      }
    }
    const removeToken=async() =>{
      try {
        await AsyncStorage.removeItem("token");
        //await AsyncStorage.removeItem("firsttime");
    
        console.log("Remove token success");
        user.action.clearstate();
      } catch (error) {
        console.log("Something went wrong", error);
    
      }
    }
  
  const user = useContext(DataContext);

    return (
      <View style={{ flex:1, justifyContent: "center", alignItems: "center" ,paddingTop: 40,backgroundColor:"white"}}>
        
        <ChatBot steps={steps} botDelay	={3000} botBubbleColor={"#68B0AB"} optionBubbleColor={"#68B0AB"} />

      

      </View>
    );
  }