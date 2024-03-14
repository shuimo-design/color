/**
 * @description hex to lab
 * @author 阿怪
 * @date 2024/3/14 16:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


const RGBToXYZ = (r: number, g: number, b: number) => {
  let [R, G, B] = [r, g, b].map(v => {
    v /= 255;
    return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
  });

  // 使用sRGB的转换矩阵
  let X = R * 0.4124564 + G * 0.3575761 + B * 0.1804375;
  let Y = R * 0.2126729 + G * 0.7151522 + B * 0.0721750;
  let Z = R * 0.0193339 + G * 0.1191920 + B * 0.9503041;

  // 输出结果是0-1范围的XYZ值
  return [X, Y, Z];
};


const XYZToLab = (x: number, y: number, z: number) => {
  // 参考白点D65
  let [Xr, Yr, Zr] = [0.95047, 1.00000, 1.08883];
  let [X, Y, Z] = [x / Xr, y / Yr, z / Zr].map(v => {
    return v > 0.008856 ? Math.pow(v, 1 / 3) : (7.787 * v) + (16 / 116);
  });

  let L = (116 * Y) - 16;
  let a = 500 * (X - Y);
  let b = 200 * (Y - Z);

  return [L, a, b];
};

const RGBToLAB = ({ r, g, b }: { r: number, g: number, b: number }) => {
  const [x, y, z] = RGBToXYZ(r, g, b);
  return XYZToLab(x, y, z);
};


// 定义Lab颜色类型
type LabColor = {
  L: number;
  a: number;
  b: number;
};


/**
 * according to https://github.com/hamada147/IsThisColourSimilar/blob/master/Colour.js
 * @param color1
 * @param color2
 */
function deltaE00(color1: LabColor, color2: LabColor): number {
  let l1 = color1.L, a1 = color1.a, b1 = color1.b;
  let l2 = color2.L, a2 = color2.a, b2 = color2.b;

  const rad2deg = function (rad: number) {
    return 360 * rad / (2 * Math.PI);
  };
  const deg2rad = function (deg: number) {
    return (2 * Math.PI * deg) / 360;
  };
  // Start Equation
  // Equation exist on the following URL http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE2000.html
  const avgL = (l1 + l2) / 2;
  const c1 = Math.sqrt(Math.pow(a1, 2) + Math.pow(b1, 2));
  const c2 = Math.sqrt(Math.pow(a2, 2) + Math.pow(b2, 2));
  const avgC = (c1 + c2) / 2;
  const g = (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7)))) / 2;

  const a1p = a1 * (1 + g);
  const a2p = a2 * (1 + g);

  const c1p = Math.sqrt(Math.pow(a1p, 2) + Math.pow(b1, 2));
  const c2p = Math.sqrt(Math.pow(a2p, 2) + Math.pow(b2, 2));

  const avgCp = (c1p + c2p) / 2;

  let h1p = rad2deg(Math.atan2(b1, a1p));
  if (h1p < 0) {
    h1p = h1p + 360;
  }

  let h2p = rad2deg(Math.atan2(b2, a2p));
  if (h2p < 0) {
    h2p = h2p + 360;
  }

  const avghp = Math.abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;

  const t = 1 - 0.17 * Math.cos(deg2rad(avghp - 30)) + 0.24 * Math.cos(deg2rad(2 * avghp)) + 0.32 * Math.cos(deg2rad(3 * avghp + 6)) - 0.2 * Math.cos(deg2rad(4 * avghp - 63));

  let deltahp = h2p - h1p;
  if (Math.abs(deltahp) > 180) {
    if (h2p <= h1p) {
      deltahp += 360;
    } else {
      deltahp -= 360;
    }
  }

  const deltalp = l2 - l1;
  const deltacp = c2p - c1p;

  deltahp = 2 * Math.sqrt(c1p * c2p) * Math.sin(deg2rad(deltahp) / 2);

  const sl = 1 + ((0.015 * Math.pow(avgL - 50, 2)) / Math.sqrt(20 + Math.pow(avgL - 50, 2)));
  const sc = 1 + 0.045 * avgCp;
  const sh = 1 + 0.015 * avgCp * t;

  const deltaro = 30 * Math.exp(-(Math.pow((avghp - 275) / 25, 2)));
  const rc = 2 * Math.sqrt(Math.pow(avgCp, 7) / (Math.pow(avgCp, 7) + Math.pow(25, 7)));
  const rt = -rc * Math.sin(2 * deg2rad(deltaro));

  const kl = 1;
  const kc = 1;
  const kh = 1;

  const deltaE = Math.sqrt(Math.pow(deltalp / (kl * sl), 2) + Math.pow(deltacp / (kc * sc), 2) + Math.pow(deltahp / (kh * sh), 2) + rt * (deltacp / (kc * sc)) * (deltahp / (kh * sh)));

  return deltaE;
}

export const deltaE00ByRGB = (rgb1: { r: number, g: number, b: number }, rgb2: { r: number, g: number, b: number }) => {
  const lab1 = RGBToLAB(rgb1);
  const lab2 = RGBToLAB(rgb2);
  return deltaE00({ L: lab1[0], a: lab1[1], b: lab1[2] }, { L: lab2[0], a: lab2[1], b: lab2[2] });
};
