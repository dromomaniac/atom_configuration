(function() {
  var a, colors, ex, k, toCamelCase, tocamelCase, v;

  colors = {
    alice_blue: '#f0f8ff',
    antique_white: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanched_almond: '#ffebcd',
    blue: '#0000ff',
    blue_violet: '#8a2be2',
    brown: '#a52a2a',
    burly_wood: '#deb887',
    cadet_blue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    corn_silk: '#fff8dc',
    cornflower_blue: '#6495ed',
    crimson: '#dc143c',
    cyan: '#00ffff',
    dark_blue: '#00008b',
    dark_cyan: '#008b8b',
    dark_golden_rod: '#b8860b',
    dark_gray: '#a9a9a9',
    dark_green: '#006400',
    dark_grey: '#a9a9a9',
    dark_khaki: '#bdb76b',
    dark_magenta: '#8b008b',
    dark_olive_green: '#556b2f',
    dark_orange: '#ff8c00',
    dark_orchid: '#9932cc',
    dark_red: '#8b0000',
    dark_salmon: '#e9967a',
    dark_seagreen: '#8fbc8f',
    dark_slateblue: '#483d8b',
    dark_slategray: '#2f4f4f',
    dark_slategrey: '#2f4f4f',
    dark_turquoise: '#00ced1',
    dark_violet: '#9400d3',
    deep_pink: '#ff1493',
    deep_skyblue: '#00bfff',
    dim_gray: '#696969',
    dim_grey: '#696969',
    dodger_blue: '#1e90ff',
    fire_brick: '#b22222',
    floral_white: '#fffaf0',
    forest_green: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghost_white: '#f8f8ff',
    gold: '#ffd700',
    golden_rod: '#daa520',
    gray: '#808080',
    green: '#008000',
    green_yellow: '#adff2f',
    grey: '#808080',
    honey_dew: '#f0fff0',
    hot_pink: '#ff69b4',
    indian_red: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavender_blush: '#fff0f5',
    lawn_green: '#7cfc00',
    lemon_chiffon: '#fffacd',
    light_blue: '#add8e6',
    light_coral: '#f08080',
    light_cyan: '#e0ffff',
    light_golden_rod_yellow: '#fafad2',
    light_gray: '#d3d3d3',
    light_green: '#90ee90',
    light_grey: '#d3d3d3',
    light_pink: '#ffb6c1',
    light_salmon: '#ffa07a',
    light_sea_green: '#20b2aa',
    light_sky_blue: '#87cefa',
    light_slate_gray: '#778899',
    light_slate_grey: '#778899',
    light_steel_blue: '#b0c4de',
    light_yellow: '#ffffe0',
    lime: '#00ff00',
    lime_green: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    medium_aquamarine: '#66cdaa',
    medium_blue: '#0000cd',
    medium_orchid: '#ba55d3',
    medium_purple: '#9370db',
    medium_sea_green: '#3cb371',
    medium_slate_blue: '#7b68ee',
    medium_spring_green: '#00fa9a',
    medium_turquoise: '#48d1cc',
    medium_violet_red: '#c71585',
    midnight_blue: '#191970',
    mint_cream: '#f5fffa',
    misty_rose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajo_white: '#ffdead',
    navy: '#000080',
    old_lace: '#fdf5e6',
    olive: '#808000',
    olive_drab: '#6b8e23',
    orange: '#ffa500',
    orange_red: '#ff4500',
    orchid: '#da70d6',
    pale_golden_rod: '#eee8aa',
    pale_green: '#98fb98',
    pale_turquoise: '#afeeee',
    pale_violet_red: '#db7093',
    papaya_whip: '#ffefd5',
    peach_puff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powder_blue: '#b0e0e6',
    purple: '#800080',
    rebecca_purple: '#663399',
    red: '#ff0000',
    rosy_brown: '#bc8f8f',
    royal_blue: '#4169e1',
    saddle_brown: '#8b4513',
    salmon: '#fa8072',
    sandy_brown: '#f4a460',
    sea_green: '#2e8b57',
    sea_shell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    sky_blue: '#87ceeb',
    slate_blue: '#6a5acd',
    slate_gray: '#708090',
    slate_grey: '#708090',
    snow: '#fffafa',
    spring_green: '#00ff7f',
    steel_blue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    white_smoke: '#f5f5f5',
    yellow: '#ffff00',
    yellow_green: '#9acd32'
  };

  module.exports = ex = {
    lower_snake: colors,
    UPPER_SNAKE: {},
    lowercase: {},
    UPPERCASE: {},
    camelCase: {},
    CamelCase: {},
    allCases: {}
  };

  toCamelCase = function(s) {
    return s[0].toUpperCase() + s.slice(1);
  };

  tocamelCase = function(s, i) {
    if (i === 0) {
      return s;
    } else {
      return s[0].toUpperCase() + s.slice(1);
    }
  };

  for (k in colors) {
    v = colors[k];
    a = k.split('_');
    ex.allCases[k] = ex.allCases[a.map(toCamelCase).join('')] = ex.allCases[a.map(tocamelCase).join('')] = ex.allCases[a.join('_').toUpperCase()] = ex.allCases[a.join('')] = ex.allCases[a.join('').toUpperCase()] = ex.CamelCase[a.map(toCamelCase).join('')] = ex.camelCase[a.map(tocamelCase).join('')] = ex.UPPER_SNAKE[a.join('_').toUpperCase()] = ex.lowercase[a.join('')] = ex.UPPERCASE[a.join('').toUpperCase()] = v;
  }

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2V2YW5oZW5kcml4MS8uYXRvbS9wYWNrYWdlcy9waWdtZW50cy9saWIvc3ZnLWNvbG9ycy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLE1BQUEsR0FDRTtJQUFBLFVBQUEsRUFBWSxTQUFaO0lBQ0EsYUFBQSxFQUFlLFNBRGY7SUFFQSxJQUFBLEVBQU0sU0FGTjtJQUdBLFVBQUEsRUFBWSxTQUhaO0lBSUEsS0FBQSxFQUFPLFNBSlA7SUFLQSxLQUFBLEVBQU8sU0FMUDtJQU1BLE1BQUEsRUFBUSxTQU5SO0lBT0EsS0FBQSxFQUFPLFNBUFA7SUFRQSxlQUFBLEVBQWlCLFNBUmpCO0lBU0EsSUFBQSxFQUFNLFNBVE47SUFVQSxXQUFBLEVBQWEsU0FWYjtJQVdBLEtBQUEsRUFBTyxTQVhQO0lBWUEsVUFBQSxFQUFZLFNBWlo7SUFhQSxVQUFBLEVBQVksU0FiWjtJQWNBLFVBQUEsRUFBWSxTQWRaO0lBZUEsU0FBQSxFQUFXLFNBZlg7SUFnQkEsS0FBQSxFQUFPLFNBaEJQO0lBaUJBLFNBQUEsRUFBVyxTQWpCWDtJQWtCQSxlQUFBLEVBQWlCLFNBbEJqQjtJQW1CQSxPQUFBLEVBQVMsU0FuQlQ7SUFvQkEsSUFBQSxFQUFNLFNBcEJOO0lBcUJBLFNBQUEsRUFBVyxTQXJCWDtJQXNCQSxTQUFBLEVBQVcsU0F0Qlg7SUF1QkEsZUFBQSxFQUFpQixTQXZCakI7SUF3QkEsU0FBQSxFQUFXLFNBeEJYO0lBeUJBLFVBQUEsRUFBWSxTQXpCWjtJQTBCQSxTQUFBLEVBQVcsU0ExQlg7SUEyQkEsVUFBQSxFQUFZLFNBM0JaO0lBNEJBLFlBQUEsRUFBYyxTQTVCZDtJQTZCQSxnQkFBQSxFQUFrQixTQTdCbEI7SUE4QkEsV0FBQSxFQUFhLFNBOUJiO0lBK0JBLFdBQUEsRUFBYSxTQS9CYjtJQWdDQSxRQUFBLEVBQVUsU0FoQ1Y7SUFpQ0EsV0FBQSxFQUFhLFNBakNiO0lB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V0FBTixDQUFrQixDQUFDLElBQW5CLENBQXdCLEVBQXhCLENBQUEsQ0FBYixHQUNBLEVBQUUsQ0FBQyxXQUFZLENBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxHQUFQLENBQVcsQ0FBQyxXQUFaLENBQUEsQ0FBQSxDQUFmLEdBQ0EsRUFBRSxDQUFDLFNBQVUsQ0FBQSxDQUFDLENBQUMsSUFBRixDQUFPLEVBQVAsQ0FBQSxDQUFiLEdBQ0EsRUFBRSxDQUFDLFNBQVUsQ0FBQSxDQUFDLENBQUMsSUFBRixDQUFPLEVBQVAsQ0FBVSxDQUFDLFdBQVgsQ0FBQSxDQUFBLENBQWIsR0FBeUM7QUFaM0M7QUFsS0EiLCJzb3VyY2VzQ29udGVudCI6WyJjb2xvcnMgPVxuICBhbGljZV9ibHVlOiAnI2YwZjhmZidcbiAgYW50aXF1ZV93aGl0ZTogJyNmYWViZDcnXG4gIGFxdWE6ICcjMDBmZmZmJ1xuICBhcXVhbWFyaW5lOiAnIzdmZmZkNCdcbiAgYXp1cmU6ICcjZjBmZmZmJ1xuICBiZWlnZTogJyNmNWY1ZGMnXG4gIGJpc3F1ZTogJyNmZmU0YzQnXG4gIGJsYWNrOiAnIzAwMDAwMCdcbiAgYmxhbmNoZWRfYWxtb25kOiAnI2ZmZWJjZCdcbiAgYmx1ZTogJyMwMDAwZmYnXG4gIGJsdWVfdmlvbGV0OiAnIzhhMmJlMidcbiAgYnJvd246ICcjYTUyYTJhJ1xuICBidXJseV93b29kOiAnI2RlYjg4NydcbiAgY2FkZXRfYmx1ZTogJyM1ZjllYTAnXG4gIGNoYXJ0cmV1c2U6ICcjN2ZmZjAwJ1xuICBjaG9jb2xhdGU6ICcjZDI2OTFlJ1xuICBjb3JhbDogJyNmZjdmNTAnXG4gIGNvcm5fc2lsazogJyNmZmY4ZGMnXG4gIGNvcm5mbG93ZXJfYmx1ZTogJyM2NDk1ZWQnXG4gIGNyaW1zb246ICcjZGMxNDNjJ1xuICBjeWFuOiAnIzAwZmZmZidcbiAgZGFya19ibHVlOiAnIzAwMDA4YidcbiAgZGFya19jeWFuOiAnIzAwOGI4YidcbiAgZGFya19nb2xkZW5fcm9kOiAnI2I4ODYwYidcbiAgZGFya19ncmF5OiAnI2E5YTlhOSdcbiAgZGFya19ncmVlbjogJyMwMDY0MDAnXG4gIGRhcmtfZ3JleTogJyNhOWE5YTknXG4gIGRhcmtfa2hha2k6ICcjYmRiNzZiJ1xuICBkYXJrX21hZ2VudGE6ICcjOGIwMDhiJ1xuICBkYXJrX29saXZlX2dyZWVuOiAnIzU1NmIyZidcbiAgZGFya19vcmFuZ2U6ICcjZmY4YzAwJ1xuICBkYXJrX29yY2hpZDogJyM5OTMyY2MnXG4gIGRhcmtfcmVkOiAnIzhiMDAwMCdcbiAgZGFya19zYWxtb246ICcjZTk5NjdhJ1xuICBkYXJrX3NlYWdyZWVuOiAnIzhmYmM4ZidcbiAgZGFya19zbGF0ZWJsdWU6ICcjNDgzZDhiJ1xuICBkYXJrX3NsYXRlZ3JheTogJyMyZjRmNGYnXG4gIGRhcmtfc2xhdGVncmV5OiAnIzJmNGY0ZidcbiAgZGFya190dXJxdW9pc2U6ICcjMDBjZWQxJ1xuICBkYXJrX3Zpb2xldDogJyM5NDAwZDMnXG4gIGRlZXBfcGluazogJyNmZjE0OTMnXG4gIGRlZXBfc2t5Ymx1ZTogJyMwMGJmZmYnXG4gIGRpbV9ncmF5OiAnIzY5Njk2OSdcbiAgZGltX2dyZXk6ICcjNjk2OTY5J1xuICBkb2RnZXJfYmx1ZTogJyMxZTkwZmYnXG4gIGZpcmVfYnJpY2s6ICcjYjIyMjIyJ1xuICBmbG9yYWxfd2hpdGU6ICcjZmZmYWYwJ1xuICBmb3Jlc3RfZ3JlZW46ICcjMjI4YjIyJ1xuICBmdWNoc2lhOiAnI2ZmMDBmZidcbiAgZ2FpbnNib3JvOiAnI2RjZGNkYydcbiAgZ2hvc3Rfd2hpdGU6ICcjZjhmOGZmJ1xuICBnb2xkOiAnI2ZmZDcwMCdcbiAgZ29sZGVuX3JvZDogJyNkYWE1MjAnXG4gIGdyYXk6ICcjODA4MDgwJ1xuICBncmVlbjogJyMwMDgwMDAnXG4gIGdyZWVuX3llbGxvdzogJyNhZGZmMmYnXG4gIGdyZXk6ICcjODA4MDgwJ1xuICBob25leV9kZXc6ICcjZjBmZmYwJ1xuICBob3RfcGluazogJyNmZjY5YjQnXG4gIGluZGlhbl9yZWQ6ICcjY2Q1YzVjJ1xuICBpbmRpZ286ICcjNGIwMDgyJ1xuICBpdm9yeTogJyNmZmZmZjAnXG4gIGtoYWtpOiAnI2YwZTY4YydcbiAgbGF2ZW5kZXI6ICcjZTZlNmZhJ1xuICBsYXZlbmRlcl9ibHVzaDogJyNmZmYwZjUnXG4gIGxhd25fZ3JlZW46ICcjN2NmYzAwJ1xuICBsZW1vbl9jaGlmZm9uOiAnI2ZmZmFjZCdcbiAgbGlnaHRfYmx1ZTogJyNhZGQ4ZTYnXG4gIGxpZ2h0X2NvcmFsOiAnI2YwODA4MCdcbiAgbGlnaHRfY3lhbjogJyNlMGZmZmYnXG4gIGxpZ2h0X2dvbGRlbl9yb2RfeWVsbG93OiAnI2ZhZmFkMidcbiAgbGlnaHRfZ3JheTogJyNkM2QzZDMnXG4gIGxpZ2h0X2dyZWVuOiAnIzkwZWU5MCdcbiAgbGlnaHRfZ3JleTogJyNkM2QzZDMnXG4gIGxpZ2h0X3Bpbms6ICcjZmZiNmMxJ1xuICBsaWdodF9zYWxtb246ICcjZmZhMDdhJ1xuICBsaWdodF9zZWFfZ3JlZW46ICcjMjBiMmFhJ1xuICBsaWdodF9za3lfYmx1ZTogJyM4N2NlZmEnXG4gIGxpZ2h0X3NsYXRlX2dyYXk6ICcjNzc4ODk5J1xuICBsaWdodF9zbGF0ZV9ncmV5OiAnIzc3ODg5OSdcbiAgbGlnaHRfc3RlZWxfYmx1ZTogJyNiMGM0ZGUnXG4gIGxpZ2h0X3llbGxvdzogJyNmZmZmZTAnXG4gIGxpbWU6ICcjMDBmZjAwJ1xuICBsaW1lX2dyZWVuOiAnIzMyY2QzMidcbiAgbGluZW46ICcjZmFmMGU2J1xuICBtYWdlbnRhOiAnI2ZmMDBmZidcbiAgbWFyb29uOiAnIzgwMDAwMCdcbiAgbWVkaXVtX2FxdWFtYXJpbmU6ICcjNjZjZGFhJ1xuICBtZWRpdW1fYmx1ZTogJyMwMDAwY2QnXG4gIG1lZGl1bV9vcmNoaWQ6ICcjYmE1NWQzJ1xuICBtZWRpdW1fcHVycGxlOiAnIzkzNzBkYidcbiAgbWVkaXVtX3NlYV9ncmVlbjogJyMzY2IzNzEnXG4gIG1lZGl1bV9zbGF0ZV9ibHVlOiAnIzdiNjhlZSdcbiAgbWVkaXVtX3NwcmluZ19ncmVlbjogJyMwMGZhOWEnXG4gIG1lZGl1bV90dXJxdW9pc2U6ICcjNDhkMWNjJ1xuICBtZWRpdW1fdmlvbGV0X3JlZDogJyNjNzE1ODUnXG4gIG1pZG5pZ2h0X2JsdWU6ICcjMTkxOTcwJ1xuICBtaW50X2NyZWFtOiAnI2Y1ZmZmYSdcbiAgbWlzdHlfcm9zZTogJyNmZmU0ZTEnXG4gIG1vY2Nhc2luOiAnI2ZmZTRiNSdcbiAgbmF2YWpvX3doaXRlOiAnI2ZmZGVhZCdcbiAgbmF2eTogJyMwMDAwODAnXG4gIG9sZF9sYWNlOiAnI2ZkZjVlNidcbiAgb2xpdmU6ICcjODA4MDAwJ1xuICBvbGl2ZV9kcmFiOiAnIzZiOGUyMydcbiAgb3JhbmdlOiAnI2ZmYTUwMCdcbiAgb3JhbmdlX3JlZDogJyNmZjQ1MDAnXG4gIG9yY2hpZDogJyNkYTcwZDYnXG4gIHBhbGVfZ29sZGVuX3JvZDogJyNlZWU4YWEnXG4gIHBhbGVfZ3JlZW46ICcjOThmYjk4J1xuICBwYWxlX3R1cnF1b2lzZTogJyNhZmVlZWUnXG4gIHBhbGVfdmlvbGV0X3JlZDogJyNkYjcwOTMnXG4gIHBhcGF5YV93aGlwOiAnI2ZmZWZkNSdcbiAgcGVhY2hfcHVmZjogJyNmZmRhYjknXG4gIHBlcnU6ICcjY2Q4NTNmJ1xuICBwaW5rOiAnI2ZmYzBjYidcbiAgcGx1bTogJyNkZGEwZGQnXG4gIHBvd2Rlcl9ibHVlOiAnI2IwZTBlNidcbiAgcHVycGxlOiAnIzgwMDA4MCdcbiAgcmViZWNjYV9wdXJwbGU6ICcjNjYzMzk5J1xuICByZWQ6ICcjZmYwMDAwJ1xuICByb3N5X2Jyb3duOiAnI2JjOGY4ZidcbiAgcm95YWxfYmx1ZTogJyM0MTY5ZTEnXG4gIHNhZGRsZV9icm93bjogJyM4YjQ1MTMnXG4gIHNhbG1vbjogJyNmYTgwNzInXG4gIHNhbmR5X2Jyb3duOiAnI2Y0YTQ2MCdcbiAgc2VhX2dyZWVuOiAnIzJlOGI1NydcbiAgc2VhX3NoZWxsOiAnI2ZmZjVlZSdcbiAgc2llbm5hOiAnI2EwNTIyZCdcbiAgc2lsdmVyOiAnI2MwYzBjMCdcbiAgc2t5X2JsdWU6ICcjODdjZWViJ1xuICBzbGF0ZV9ibHVlOiAnIzZhNWFjZCdcbiAgc2xhdGVfZ3JheTogJyM3MDgwOTAnXG4gIHNsYXRlX2dyZXk6ICcjNzA4MDkwJ1xuICBzbm93OiAnI2ZmZmFmYSdcbiAgc3ByaW5nX2dyZWVuOiAnIzAwZmY3ZidcbiAgc3RlZWxfYmx1ZTogJyM0NjgyYjQnXG4gIHRhbjogJyNkMmI0OGMnXG4gIHRlYWw6ICcjMDA4MDgwJ1xuICB0aGlzdGxlOiAnI2Q4YmZkOCdcbiAgdG9tYXRvOiAnI2ZmNjM0NydcbiAgdHVycXVvaXNlOiAnIzQwZTBkMCdcbiAgdmlvbGV0OiAnI2VlODJlZSdcbiAgd2hlYXQ6ICcjZjVkZWIzJ1xuICB3aGl0ZTogJyNmZmZmZmYnXG4gIHdoaXRlX3Ntb2tlOiAnI2Y1ZjVmNSdcbiAgeWVsbG93OiAnI2ZmZmYwMCdcbiAgeWVsbG93X2dyZWVuOiAnIzlhY2QzMidcblxubW9kdWxlLmV4cG9ydHMgPSBleCA9XG4gIGxvd2VyX3NuYWtlOiBjb2xvcnNcbiAgVVBQRVJfU05BS0U6IHt9XG4gIGxvd2VyY2FzZToge31cbiAgVVBQRVJDQVNFOiB7fVxuICBjYW1lbENhc2U6IHt9XG4gIENhbWVsQ2FzZToge31cbiAgYWxsQ2FzZXM6IHt9XG5cbnRvQ2FtZWxDYXNlID0gKHMpIC0+IHNbMF0udG9VcHBlckNhc2UoKSArIHNbMS4uLTFdXG50b2NhbWVsQ2FzZSA9IChzLGkpIC0+IGlmIGkgaXMgMCB0aGVuIHMgZWxzZSBzWzBdLnRvVXBwZXJDYXNlKCkgKyBzWzEuLi0xXVxuXG5mb3Igayx2IG9mIGNvbG9yc1xuICBhID0gay5zcGxpdCgnXycpXG4gIGV4LmFsbENhc2VzW2tdID1cbiAgZXguYWxsQ2FzZXNbYS5tYXAodG9DYW1lbENhc2UpLmpvaW4oJycpXSA9XG4gIGV4LmFsbENhc2VzW2EubWFwKHRvY2FtZWxDYXNlKS5qb2luKCcnKV0gPVxuICBleC5hbGxDYXNlc1thLmpvaW4oJ18nKS50b1VwcGVyQ2FzZSgpXSA9XG4gIGV4LmFsbENhc2VzW2Euam9pbignJyldID1cbiAgZXguYWxsQ2FzZXNbYS5qb2luKCcnKS50b1VwcGVyQ2FzZSgpXSA9XG4gIGV4LkNhbWVsQ2FzZVthLm1hcCh0b0NhbWVsQ2FzZSkuam9pbignJyldID1cbiAgZXguY2FtZWxDYXNlW2EubWFwKHRvY2FtZWxDYXNlKS5qb2luKCcnKV0gPVxuICBleC5VUFBFUl9TTkFLRVthLmpvaW4oJ18nKS50b1VwcGVyQ2FzZSgpXSA9XG4gIGV4Lmxvd2VyY2FzZVthLmpvaW4oJycpXSA9XG4gIGV4LlVQUEVSQ0FTRVthLmpvaW4oJycpLnRvVXBwZXJDYXNlKCldID0gdlxuIl19
