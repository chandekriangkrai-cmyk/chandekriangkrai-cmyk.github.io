import Phaser from 'phaser';
import './style.css';
import { Boot, Classroom, CreateStudent, Title } from './scenes';
new Phaser.Game({type:Phaser.AUTO,width:816,height:624,parent:'game',backgroundColor:'#101827',pixelArt:true,antialias:false,physics:{default:'arcade',arcade:{debug:false}},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[Boot,Title,CreateStudent,Classroom]});
