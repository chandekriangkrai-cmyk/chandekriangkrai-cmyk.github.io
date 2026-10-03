import { Scene } from 'phaser';

const LPC_W = 576;
const LPC_H = 256;
const LPC_FRAME = 64;
const LPC_FRAMES_PER_ROW = 9;

export class Boot extends Scene {
  constructor() { super('Boot'); }

  preload(): void {
    this.load.image('classroom1', '/assets/classroom1.png');
    this.load.image('classroom2', '/assets/classroom2.png');

    // School Time student art: Universal LPC child layers, pinned in assets/external/lpc-school.
    this.load.spritesheet('lpcBody', '/assets/external/lpc-school/body/child-walk.png', { frameWidth: LPC_FRAME, frameHeight: LPC_FRAME });
    this.load.spritesheet('lpcShirt', '/assets/external/lpc-school/shirt/white-walk.png', { frameWidth: LPC_FRAME, frameHeight: LPC_FRAME });
    this.load.spritesheet('lpcPants', '/assets/external/lpc-school/pants/darkblue-walk.png', { frameWidth: LPC_FRAME, frameHeight: LPC_FRAME });
    this.load.spritesheet('lpcSkirt', '/assets/external/lpc-school/skirt/darkblue-walk.png', { frameWidth: LPC_FRAME, frameHeight: LPC_FRAME });
  }

  create(): void {
    this.composeStudentTexture('schoolBoy', 'lpcPants');
    this.composeStudentTexture('schoolGirl', 'lpcSkirt');

    const make = (key: string, prefix: string): void => {
      const rows: Record<string, number> = { down: 0, left: 9, right: 18, up: 27 };
      for (const [direction, start] of Object.entries(rows)) {
        const animKey = `${prefix}-${direction}`;
        if (!this.anims.exists(animKey)) {
          this.anims.create({
            key: animKey,
            frames: this.anims.generateFrameNumbers(key, { start, end: start + LPC_FRAMES_PER_ROW - 1 }),
            frameRate: 8,
            repeat: -1,
          });
        }
      }
    };

    make('schoolBoy', 'boy');
    make('schoolGirl', 'girl');
    this.scene.start('Title');
  }

  private composeStudentTexture(outputKey: string, lowerLayerKey: string): void {
    const texture = this.textures.createCanvas(outputKey, LPC_W, LPC_H);
    const context = texture.context;
    context.imageSmoothingEnabled = false;

    const drawLayer = (key: string): void => {
      const source = this.textures.get(key).getSourceImage() as CanvasImageSource;
      context.drawImage(source, 0, 0, LPC_W, LPC_H);
    };

    drawLayer('lpcBody');
    drawLayer('lpcShirt');
    drawLayer(lowerLayerKey);
    texture.refresh();
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < LPC_FRAMES_PER_ROW; col += 1) {
        const frame = row * LPC_FRAMES_PER_ROW + col;
        texture.add(String(frame), 0, col * LPC_FRAME, row * LPC_FRAME, LPC_FRAME, LPC_FRAME);
      }
    }
  }
}
