/* NIVA character illustrations — original inline-SVG people.
 *
 * Three independently drawn characters (each owns its own face, hair, neck and clothing):
 *   HairCoverageCharacter      – man, ~30   (hair restoration / hair coverage)
 *   SkinCoverageCharacter      – woman, ~30 (skin care & aesthetic coverage)
 *   CosmeticSurgeryCharacter   – woman, ~40 (eligible cosmetic surgery coverage)
 *
 * Each function returns an SVG string. All art is drawn around x = 0 inside
 * <g transform="translate(95 0)">, viewBox "-30 0 252 340" (head, neck, shoulders).
 * Eyes sit near y≈187 and the face centre near x≈95 so the existing scene overlays still line up.
 * `uid` keeps clipPath ids unique when several characters share a page.
 *
 * Mount with: <span data-niva-character="hair|skin|surgery"></span>
 */
(function () {
  var VB = '-30 0 252 340';

  function wrap(label, uid, body) {
    return '<svg class="niva-char" xmlns="http://www.w3.org/2000/svg" viewBox="' + VB + '" width="252" height="340" ' +
      'preserveAspectRatio="xMidYMax meet" ' + (label ? 'role="img" aria-label="' + label + '"' : 'aria-hidden="true" focusable="false"') +
      ' style="overflow:visible"><g transform="translate(95 0)">' + body + '</g></svg>';
  }

  /* ───────────────────────── A · HAIR COVERAGE (man) ───────────────────────── */
  function HairCoverageCharacter(opts) {
    opts = opts || {};
    var u = (opts.uid || 'ha') + '-';
    var skin = '#EBAB92', shade = '#D98D78', deep = '#C4705F';
    var hair = '#251D33', hairHi = '#3E3250';
    var s = '';
    // neck (broad, slightly forward)
    s += '<path d="M-25 244 L-27 314 L27 314 L25 244 Z" fill="' + skin + '"/>';
    s += '<path d="M-26 250 C-12 270 14 274 26 252 L27 274 C14 290 -12 290 -27 274 Z" fill="' + shade + '" opacity=".6"/>';
    // sweater — navy crew neck, right shoulder a touch higher
    s += '<path d="M-126 340 L-126 324 C-124 304 -92 296 -54 290 L-25 281 C-20 297 -10 305 0 305 C10 305 20 297 25 281 L55 287 C94 292 126 303 126 322 L126 340 Z" fill="#202B55"/>';
    s += '<path d="M-24 279 C-19 299 19 299 24 279" fill="none" stroke="' + shade + '" stroke-width="5" stroke-linecap="round" opacity=".55"/>';
    s += '<path d="M-28 287 C-22 311 22 311 28 287" fill="none" stroke="#33427F" stroke-width="1.800" stroke-linecap="round" opacity=".9"/>';
    s += '<path d="M-84 316 C-62 308 -44 306 -30 308 M60 308 C78 308 96 312 108 318" fill="none" stroke="#2B3970" stroke-width="2" stroke-linecap="round" opacity=".7"/>';
    // ears
    s += '<path d="M-43 181 C-53 177 -56 191 -54 201 C-52 212 -45 214 -41 208 Z" fill="' + skin + '"/>';
    s += '<path d="M-48 186 C-51 190 -50 198 -47 203" fill="none" stroke="' + deep + '" stroke-width="1.3" stroke-linecap="round" opacity=".6"/>';
    s += '<path d="M43 181 C53 177 56 191 54 201 C52 212 45 214 41 208 Z" fill="' + skin + '"/>';
    s += '<path d="M48 186 C51 190 50 198 47 203" fill="none" stroke="' + deep + '" stroke-width="1.3" stroke-linecap="round" opacity=".6"/>';
    // face — long oval, squarer jaw
    s += '<path d="M-44 168 C-46 200 -40 232 -27 250 C-18 261 -10 267 0 267 C10 267 19 261 27 250 C40 232 46 200 44 168 C42 130 22 104 0 104 C-22 104 -42 130 -44 168 Z" fill="' + skin + '"/>';
    // light fall-off on the right side of the face
    s += '<path d="M44 168 C46 200 40 232 27 250 C19 261 10 267 0 267 C16 262 32 246 37 224 C41 206 41 188 38 168 Z" fill="' + shade + '" opacity=".35"/>';
    // eyes
    s += '<clipPath id="' + u + 'eL"><path d="M-30 187.500 C-25 181.500 -15 181.500 -10.500 187.500 C-15 191.500 -25 191.500 -30 187.500 Z"/></clipPath>';
    s += '<clipPath id="' + u + 'eR"><path d="M11 187 C15.500 181 25.500 181 30.500 187 C25.500 191 15.500 191 11 187 Z"/></clipPath>';
    s += '<g transform="translate(0 187) scale(1 .8) translate(0 -187)">';
    s += '<path d="M-30 187.500 C-25 181.500 -15 181.500 -10.500 187.500 C-15 191.500 -25 191.500 -30 187.500 Z" fill="#F7EFEE"/>';
    s += '<circle cx="-19" cy="187.200" r="3.700" fill="#3A2A2C" clip-path="url(#' + u + 'eL)"/>';
    s += '<path d="M-31 187.800 C-25 181 -14 181 -10 187" fill="none" stroke="#2A1E26" stroke-width="2.100" stroke-linecap="round"/>';
    s += '<path d="M-28 182.200 C-23 178.200 -16 178.200 -12.500 181.800" fill="none" stroke="' + deep + '" stroke-width="1" opacity=".55" stroke-linecap="round"/>';
    s += '<path d="M-27 190 C-22 192.300 -17 192.300 -13 190" fill="none" stroke="' + shade + '" stroke-width="1" opacity=".8" stroke-linecap="round"/>';
    s += '<path d="M11 187 C15.500 181 25.500 181 30.500 187 C25.500 191 15.500 191 11 187 Z" fill="#F7EFEE"/>';
    s += '<circle cx="21.500" cy="186.800" r="3.700" fill="#3A2A2C" clip-path="url(#' + u + 'eR)"/>';
    s += '<path d="M10.500 187.500 C15 180.500 26 180.500 31.500 187.500" fill="none" stroke="#2A1E26" stroke-width="2.100" stroke-linecap="round"/>';
    s += '<path d="M13 181.800 C17 178 24 178 28.500 182" fill="none" stroke="' + deep + '" stroke-width="1" opacity=".55" stroke-linecap="round"/>';
    s += '<path d="M14 189.500 C18 192 24 192 28 189.500" fill="none" stroke="' + shade + '" stroke-width="1" opacity=".8" stroke-linecap="round"/>';
    s += '</g>';
    // brows — low, straight-ish, understated
    s += '<path d="M-33 178 C-27 172.500 -15 171 -8 174.500" fill="none" stroke="#2A2030" stroke-width="3.300" stroke-linecap="round"/>';
    s += '<path d="M9 173.500 C16 170 28 171 34 176.500" fill="none" stroke="#2A2030" stroke-width="3.300" stroke-linecap="round"/>';
    // nose
    s += '<path d="M7 192 C8 203 10 211 11 218" fill="none" stroke="' + shade + '" stroke-width="2.200" stroke-linecap="round" opacity=".55"/>';
    s += '<ellipse cx="0" cy="215" rx="3.200" ry="6" fill="#F8CDBD" opacity=".5"/>';
    s += '<path d="M-10 219 C-12 223 -9 226.500 -4 225.500 M12 219 C14 223 11 226.500 6 225.500" fill="none" stroke="' + deep + '" stroke-width="1.400" stroke-linecap="round" opacity=".6"/>';
    s += '<path d="M-8 223.500 C-3 227 6 227 10 223" fill="none" stroke="' + deep + '" stroke-width="1.800" stroke-linecap="round" opacity=".75"/>';
    s += '<ellipse cx="-4.500" cy="223" rx="2.300" ry="1.300" fill="#B5655A" opacity=".7"/><ellipse cx="7" cy="223" rx="2.300" ry="1.300" fill="#B5655A" opacity=".7"/>';
    // philtrum + mouth
    s += '<path d="M-2 229 C-2 232 -2 234 -1.500 236" fill="none" stroke="' + shade + '" stroke-width="1.300" opacity=".5" stroke-linecap="round"/>';
    s += '<path d="M-15 241 C-9 237.500 -3 236.500 1 238 C5 236.500 11 237.500 16.500 240.500 C9 242.500 -8 242.500 -15 241 Z" fill="#C57A71"/>';
    s += '<path d="M-12 242 C-5 249.500 8 249.500 14 241.800 C7 244 -6 244 -12 242 Z" fill="#D58D83"/>';
    s += '<path d="M-15 241 C-7 243.500 8 243.500 16.500 240.500" fill="none" stroke="#A25659" stroke-width="1.500" stroke-linecap="round"/>';
    s += '<ellipse cx="1" cy="254" rx="9" ry="3.600" fill="' + shade + '" opacity=".3"/>';
    // faint jaw definition
    s += '<path d="M-38 232 C-30 250 -18 262 -3 265" fill="none" stroke="' + shade + '" stroke-width="1.500" opacity=".35" stroke-linecap="round"/>';
    var h = '';
    // hair — wavy, swept to his right, natural temples
    h += '<path d="M-46 190 C-55 172 -59 146 -52 124 C-47 106 -33 94 -17 90 C-8 82 10 80 24 86 C42 86 56 100 58 121 C60 142 55 168 47 190 L44 184 C45 170 42 158 38 152 C33 143 25 138 17 135 C9 131 1 128 -8 129 C-20 131 -30 138 -36 150 C-41 160 -43 172 -43 184 Z" fill="' + hair + '"/>';
        h += '<path d="M-38 114 C-27 103 -12 102 -3 110 C6 100 22 99 34 110" fill="none" stroke="' + hairHi + '" stroke-width="2.300" stroke-linecap="round"/>';
    h += '<path d="M-47 138 C-37 123 -22 120 -14 128 M-4 118 C8 109 26 112 38 124 M20 124 C32 120 44 126 52 138" fill="none" stroke="' + hairHi + '" stroke-width="2" stroke-linecap="round"/>';
    h += '<path d="M-51 160 C-53 150 -51 140 -46 132" fill="none" stroke="' + hairHi + '" stroke-width="1.700" stroke-linecap="round" opacity=".8"/>';
    if (opts.ba) {
      // BEFORE: scalp showing, receded temples, thin crown — AFTER: the full hairstyle grows back in
      s += '<path d="M-44 170 C-45 126 -26 91 0 91 C26 91 45 126 44 170 Z" fill="' + skin + '"/>';
      s += '<ellipse cx="2" cy="106" rx="19" ry="8" fill="#F5C7B4" opacity=".45"/>';
      s += '<g class="niva-ba-before">' +
        '<path d="M-47 190 C-55 170 -57 148 -51 130 C-48 122 -43 116 -37 112 C-35 120 -36 128 -38 136 C-40 146 -42 160 -43 184 Z" fill="' + hair + '"/>' +
        '<path d="M47 190 C55 170 57 148 51 130 C48 122 43 116 37 112 C35 120 36 128 38 136 C40 146 42 160 44 184 Z" fill="' + hair + '"/>' +
        '<path d="M-16 101 C-6 94 12 94 22 101 C12 100 2 103 -8 109 C-14 108 -17 105 -16 101 Z" fill="' + hair + '"/>' +
        '<path d="M-6 113 C0 109 8 109 14 113 M-24 120 C-18 116 -12 116 -8 120" fill="none" stroke="' + hair + '" stroke-width="1.600" stroke-linecap="round" opacity=".75"/></g>';
      s += '<g class="niva-ba-after">' + h + '</g>';
    } else {
      s += h;
    }
    return wrap(opts.label === undefined ? '' : opts.label, u, s);
  }

  /* ───────────────────────── B · SKIN COVERAGE (woman, ~30) ───────────────────────── */
  function SkinCoverageCharacter(opts) {
    opts = opts || {};
    var u = (opts.uid || 'sk') + '-';
    var skin = '#F3B7A5', shade = '#E99B8C', deep = '#CE7B6D';
    var hair = '#2B2036', hairHi = '#43365A';
    var s = '';
    // low bun peeking behind the neck (back layer)
    s += '<g transform="rotate(8 0 262)">';
    s += '<ellipse cx="36" cy="262" rx="23" ry="19" fill="' + hair + '"/>';
    s += '<path d="M20 256 C28 250 42 250 52 258 M22 266 C32 272 44 270 52 264" fill="none" stroke="' + hairHi + '" stroke-width="2" stroke-linecap="round"/></g>';
    // neck — slim and long
    s += '<path d="M-20 248 L-23 316 L23 316 L20 248 Z" fill="' + skin + '"/>';
    s += '<path d="M-21 252 C-9 268 11 270 21 254 L23 272 C10 285 -10 285 -23 272 Z" fill="' + shade + '" opacity=".55"/>';
    // muted-blue knit, scoop neck, narrower sloping shoulders
    s += '<path d="M-118 340 L-120 326 C-118 308 -88 298 -52 292 L-26 284 C-22 300 -12 313 0 313 C12 313 22 300 28 284 L54 292 C88 298 118 308 120 326 L118 340 Z" fill="#5873BB"/>';
    s += '<path d="M-26 284 C-22 304 -10 316 0 316 C10 316 22 304 28 284" fill="none" stroke="#6D88CE" stroke-width="3.200" stroke-linecap="round"/>';
    s += '<path d="M-96 322 C-70 312 -50 310 -34 312 M44 311 C64 310 84 314 100 322" fill="none" stroke="#4A63A5" stroke-width="2" stroke-linecap="round" opacity=".7"/>';
    // collarbone hint
    s += '<path d="M-16 298 C-10 300 -6 301 -3 301 M16 298 C10 300 6 301 3 301" fill="none" stroke="' + shade + '" stroke-width="1.300" stroke-linecap="round" opacity=".6"/>';
    // head group, tilted slightly
    s += '<g transform="rotate(4 0 268)">';
    // ears
    s += '<path d="M-40 183 C-48 180 -50 192 -48 200 C-46 208 -41 209 -38 205 Z" fill="' + skin + '"/>';
    s += '<path d="M40 183 C48 180 50 192 48 200 C46 208 41 209 38 205 Z" fill="' + skin + '"/>';
    // face — softer oval, higher cheek, gentler chin
    s += '<path d="M-41 172 C-42 198 -38 226 -26 245 C-19 257 -10 263 0 263 C10 263 19 257 26 245 C38 226 42 198 41 172 C40 134 22 108 0 108 C-22 108 -40 134 -41 172 Z" fill="' + skin + '"/>';
    s += '<path d="M41 172 C42 198 38 226 26 245 C19 257 10 263 0 263 C14 257 28 242 33 222 C37 206 37 190 35 172 Z" fill="' + shade + '" opacity=".3"/>';
    // cheek warmth
    s += '<ellipse cx="-24" cy="214" rx="11" ry="7" fill="#EC9F90" opacity=".25"/><ellipse cx="26" cy="214" rx="11" ry="7" fill="#EC9F90" opacity=".2"/>';
    // eyes — almond, soft lift at the outer corner
    s += '<clipPath id="' + u + 'eL"><path d="M-28 190 C-24 183.500 -13 183 -8.500 189 C-13 193 -23 193.500 -28 190 Z"/></clipPath>';
    s += '<clipPath id="' + u + 'eR"><path d="M9 189 C13.500 183 24.500 183.500 28.500 190 C23.500 193.500 13.500 193 9 189 Z"/></clipPath>';
    s += '<g transform="translate(0 189) scale(1 .92) translate(0 -189)">';
    s += '<path d="M-28 190 C-24 183.500 -13 183 -8.500 189 C-13 193 -23 193.500 -28 190 Z" fill="#F8F1F1"/>';
    s += '<circle cx="-17.500" cy="188.500" r="3.800" fill="#3B2B2D" clip-path="url(#' + u + 'eL)"/>';
    s += '<path d="M-29.500 190.500 C-24 182.500 -13 182 -8 188.500" fill="none" stroke="#2C2030" stroke-width="1.900" stroke-linecap="round"/>';
    s += '<path d="M-26 184.500 C-21 180.500 -14 180.500 -10.500 183.500" fill="none" stroke="' + deep + '" stroke-width="1" opacity=".5" stroke-linecap="round"/>';
    s += '<path d="M-25 192.500 C-21 194.500 -16 194.500 -12 192.500" fill="none" stroke="' + shade + '" stroke-width="1" opacity=".8" stroke-linecap="round"/>';
    s += '<path d="M9 189 C13.500 183 24.500 183.500 28.500 190 C23.500 193.500 13.500 193 9 189 Z" fill="#F8F1F1"/>';
    s += '<circle cx="19.500" cy="188.500" r="3.800" fill="#3B2B2D" clip-path="url(#' + u + 'eR)"/>';
    s += '<path d="M7.500 188.500 C13 182 24 182.500 30 190.500" fill="none" stroke="#2C2030" stroke-width="1.900" stroke-linecap="round"/>';
    s += '<path d="M11.500 183.500 C16 180 23 180.500 27.500 184.500" fill="none" stroke="' + deep + '" stroke-width="1" opacity=".5" stroke-linecap="round"/>';
    s += '<path d="M12 192.500 C16 194.500 21 194.500 25 192.500" fill="none" stroke="' + shade + '" stroke-width="1" opacity=".8" stroke-linecap="round"/>';
    s += '</g>';
    // brows — soft arch
    s += '<path d="M-30 178 C-25 170 -14 169 -7 173.500" fill="none" stroke="#33263A" stroke-width="2.600" stroke-linecap="round"/>';
    s += '<path d="M8 172.500 C14 168.500 25 169.500 31 177" fill="none" stroke="#33263A" stroke-width="2.600" stroke-linecap="round"/>';
    // nose — small, straight
    s += '<path d="M5.500 194 C6.500 203 7.500 210 8 215.500" fill="none" stroke="' + shade + '" stroke-width="2" stroke-linecap="round" opacity=".5"/>';
    s += '<ellipse cx="0" cy="212" rx="2.600" ry="5.500" fill="#FAD3C5" opacity=".5"/>';
    s += '<path d="M-8 217.500 C-9.500 221 -6.500 223.500 -3 222.500 M9 217.500 C10.500 221 7.500 223.500 4 222.500" fill="none" stroke="' + deep + '" stroke-width="1.300" stroke-linecap="round" opacity=".6"/>';
    s += '<path d="M-6 221 C-2 224 4 224 7 221" fill="none" stroke="' + deep + '" stroke-width="1.600" stroke-linecap="round" opacity=".7"/>';
    s += '<ellipse cx="-3.500" cy="221" rx="1.900" ry="1.100" fill="#B96A5F" opacity=".65"/><ellipse cx="4.500" cy="221" rx="1.900" ry="1.100" fill="#B96A5F" opacity=".65"/>';
    // mouth — fuller, relaxed
    s += '<path d="M-14 238 C-8 233.500 -3 233.500 0 235.800 C3 233.500 8 233.500 14.500 237.500 C7 240.500 -7 240.500 -14 238 Z" fill="#C97478"/>';
    s += '<path d="M-11.500 239.300 C-4 249 5 249 11.500 239 C5 241.500 -5 241.500 -11.500 239.300 Z" fill="#D88A8B"/>';
    s += '<path d="M-14 238 C-6 241 6 241 14.500 237.500" fill="none" stroke="#A55A62" stroke-width="1.300" stroke-linecap="round"/>';
    s += '<ellipse cx="0" cy="252" rx="7.500" ry="3" fill="' + shade + '" opacity=".28"/>';
    // hair — pulled back, soft part, ears visible; loose framing strands
    s += '<path d="M-47 198 C-52 164 -50 136 -37 118 C-25 102 -5 96 12 98 C34 100 50 118 51 150 C52 172 50 188 46 200 L41 184 C42 168 40 154 33 143 C25 132 10 124 -6 121 C-22 126 -34 140 -39 156 C-42 166 -42 176 -41 186 Z" fill="' + hair + '"/>';
    s += '<path d="M-6 121 C-14 108 -10 100 0 98" fill="none" stroke="' + hairHi + '" stroke-width="1.800" stroke-linecap="round" opacity=".8"/>';
    s += '<path d="M-26 128 C-18 118 -6 117 0 123 M6 123 C16 114 30 118 38 130" fill="none" stroke="' + hairHi + '" stroke-width="2" stroke-linecap="round"/>';
    s += '<path d="M-41 150 C-37 160 -36 176 -38 190 C-42 182 -44 166 -41 150 Z" fill="' + hair + '"/>';
    s += '</g>';
    return wrap(opts.label === undefined ? '' : opts.label, u, s);
  }

  /* ───────────────────────── C · COSMETIC SURGERY COVERAGE (woman, ~40) ───────────────────────── */
  function CosmeticSurgeryCharacter(opts) {
    opts = opts || {};
    var u = (opts.uid || 'cs') + '-';
    var skin = '#E8AA90', shade = '#D58E7A', deep = '#BD6F5F';
    var hair = '#37262B', hairHi = '#503A40';
    var s = '';
    // back hair of the bob
    s += '<path d="M-48 150 C-62 186 -62 228 -50 254 C-32 262 32 262 50 254 C62 228 62 186 48 150 Z" fill="' + hair + '"/>';
    // neck
    s += '<path d="M-23 246 L-25 304 L25 304 L23 246 Z" fill="' + skin + '"/>';
    s += '<path d="M-24 252 C-10 270 12 272 24 254 L25 276 C12 290 -12 290 -25 276 Z" fill="' + shade + '" opacity=".55"/>';
    // structured navy blazer — left shoulder lower, V neck, lapels, ivory shell
    s += '<path d="M-124 340 L-124 332 C-122 312 -90 304 -54 296 L-26 285 L0 326 L26 285 L56 291 C94 297 124 306 124 326 L124 340 Z" fill="#1B2448"/>';
    s += '<path d="M-26 285 L0 326 L26 285 L12 284 C8 300 -8 300 -12 284 Z" fill="#E6EBF7"/>';
    s += '<path d="M-30 284 L-1 334 L-14 340 L-66 340 L-60 304 Z" fill="#26325F"/>';
    s += '<path d="M30 284 L1 334 L14 340 L66 340 L62 300 Z" fill="#26325F"/>';
    s += '<path d="M-30 284 L-1 334 M30 284 L1 334" fill="none" stroke="#3A4880" stroke-width="1.500" stroke-linecap="round"/>';
    // head group, slight turn and tilt
    s += '<g transform="rotate(-2 0 270)">';
    // ears (mostly hidden under hair)
    s += '<path d="M-42 184 C-51 181 -53 193 -51 201 C-49 209 -43 210 -40 206 Z" fill="' + skin + '"/>';
    s += '<path d="M42 184 C51 181 53 193 51 201 C49 209 43 210 40 206 Z" fill="' + skin + '"/>';
    // face — longer, defined jaw
    s += '<path d="M-43 170 C-44 198 -40 226 -30 246 C-24 258 -14 267 0 268 C14 267 24 258 30 246 C40 226 44 198 43 170 C42 132 24 106 0 106 C-24 106 -42 132 -43 170 Z" fill="' + skin + '"/>';
    s += '<path d="M43 170 C44 198 40 226 30 246 C24 258 14 267 0 268 C18 262 34 246 38 224 C41 206 40 188 37 170 Z" fill="' + shade + '" opacity=".32"/>';
    // cheek structure + gentle smile lines
    s += '<path d="M-31 222 C-29 232 -25 238 -19 241 M33 222 C31 232 27 238 21 241" fill="none" stroke="' + shade + '" stroke-width="1.200" stroke-linecap="round" opacity=".45"/>';
    // eyes — slightly deep-set, defined crease
    s += '<clipPath id="' + u + 'eL"><path d="M-29 187 C-25 181.800 -15 181.500 -10 186.500 C-15 190.800 -25 191 -29 187 Z"/></clipPath>';
    s += '<clipPath id="' + u + 'eR"><path d="M10 186.500 C15 181.500 25 181.800 29 187 C25 191 15 190.800 10 186.500 Z"/></clipPath>';
    s += '<g transform="translate(0 187) scale(1 .82) translate(0 -187)">';
    s += '<path d="M-29 187 C-25 181.800 -15 181.500 -10 186.500 C-15 190.800 -25 191 -29 187 Z" fill="#F6EEED"/>';
    s += '<circle cx="-19" cy="186.600" r="3.600" fill="#4A3329" clip-path="url(#' + u + 'eL)"/>';
    s += '<path d="M-30 187.300 C-25 181 -15 180.800 -9.500 186" fill="none" stroke="#2D2028" stroke-width="2" stroke-linecap="round"/>';
    s += '<path d="M-28 181.300 C-23 177 -16 177 -11.500 180.500" fill="none" stroke="' + deep + '" stroke-width="1.100" opacity=".6" stroke-linecap="round"/>';
    s += '<path d="M-26 189.800 C-22 191.800 -17 191.800 -13 189.800" fill="none" stroke="' + shade + '" stroke-width="1" opacity=".8" stroke-linecap="round"/>';
    s += '<path d="M10 186.500 C15 181.500 25 181.800 29 187 C25 191 15 190.800 10 186.500 Z" fill="#F6EEED"/>';
    s += '<circle cx="19" cy="186.600" r="3.600" fill="#4A3329" clip-path="url(#' + u + 'eR)"/>';
    s += '<path d="M9.500 186 C15 180.800 25 181 30 187.300" fill="none" stroke="#2D2028" stroke-width="2" stroke-linecap="round"/>';
    s += '<path d="M11.500 180.500 C16 177 23 177 28 181.300" fill="none" stroke="' + deep + '" stroke-width="1.100" opacity=".6" stroke-linecap="round"/>';
    s += '<path d="M13 189.800 C17 191.800 22 191.800 26 189.800" fill="none" stroke="' + shade + '" stroke-width="1" opacity=".8" stroke-linecap="round"/>';
    s += '</g>';
    // brows — tidy, gently angled
    s += '<path d="M-32 177 C-26 172.500 -16 171.500 -8 174" fill="none" stroke="#3A2A2E" stroke-width="2.700" stroke-linecap="round"/>';
    s += '<path d="M8.500 173.500 C16 171 26 172 32 176.500" fill="none" stroke="#3A2A2E" stroke-width="2.700" stroke-linecap="round"/>';
    // nose — longer bridge, defined tip
    s += '<path d="M-6 192 C-6.500 204 -7.500 212 -9 218" fill="none" stroke="' + shade + '" stroke-width="1.800" stroke-linecap="round" opacity=".4"/>';
    s += '<path d="M6 192 C7 204 9 212 10.500 219" fill="none" stroke="' + shade + '" stroke-width="2.100" stroke-linecap="round" opacity=".55"/>';
    s += '<ellipse cx="-1" cy="214" rx="3" ry="6.500" fill="#F6C9B7" opacity=".5"/>';
    s += '<path d="M-10 220 C-12 224.500 -8.500 227.500 -4 226 M12 220 C14 224.500 10.500 227.500 6 226" fill="none" stroke="' + deep + '" stroke-width="1.300" stroke-linecap="round" opacity=".6"/>';
    s += '<path d="M-7 224 C-3 227.500 5 227.500 8.500 224" fill="none" stroke="' + deep + '" stroke-width="1.700" stroke-linecap="round" opacity=".7"/>';
    s += '<ellipse cx="-4" cy="223.500" rx="2" ry="1.200" fill="#AD5E53" opacity=".65"/><ellipse cx="6" cy="223.500" rx="2" ry="1.200" fill="#AD5E53" opacity=".65"/>';
    // mouth — composed, slim lips
    s += '<path d="M-14 243 C-8 240 -3 239.500 0.500 241 C4 239.500 9 240 14.500 243 C7 244.600 -7 244.600 -14 243 Z" fill="#BE6F6C"/>';
    s += '<path d="M-11 243.800 C-4 250 6 250 12 243.600 C6 245.600 -5 245.600 -11 243.800 Z" fill="#CF817C"/>';
    s += '<path d="M-14 243 C-6 245.500 7 245.500 14.500 243" fill="none" stroke="#9B5058" stroke-width="1.400" stroke-linecap="round"/>';
    s += '<ellipse cx="0.500" cy="257" rx="8" ry="3" fill="' + shade + '" opacity=".28"/>';
    if (opts.ba) {
      // BEFORE a facelift / contour procedure: soft jowls, deeper smile lines, under-eye shading (fades out in the loop)
      var bf = '';
      bf += '<path d="M-36 230 C-46 246 -41 263 -26 269 C-20 271 -14 269 -9 266 L-23 255 C-30 249 -34 241 -36 230 Z" fill="' + skin + '"/>';
      bf += '<path d="M36 230 C46 246 41 263 26 269 C20 271 14 269 9 266 L23 255 C30 249 34 241 36 230 Z" fill="' + skin + '"/>';
      bf += '<path d="M-29 236 C-33 248 -28 259 -19 265 M29 236 C33 248 28 259 19 265" fill="none" stroke="' + shade + '" stroke-width="1.700" stroke-linecap="round" opacity=".65"/>';
      bf += '<path d="M-15 271 C-6 281 6 281 15 271 C6 277 -6 277 -15 271 Z" fill="' + shade + '" opacity=".55"/>';
      bf += '<path d="M-24 213 C-28 226 -25 237 -17 243 M24 213 C28 226 25 237 17 243" fill="none" stroke="' + deep + '" stroke-width="2.600" stroke-linecap="round" opacity=".85"/>';
      bf += '<path d="M-30 193 C-24 201 -14 201 -9 193 M9 193 C14 201 24 201 30 193" fill="none" stroke="' + deep + '" stroke-width="2.400" stroke-linecap="round" opacity=".6"/>';
      bf += '<path d="M-32 232 C-30 246 -22 258 -10 264 L-12 250 C-20 246 -26 240 -32 232 Z M32 232 C30 246 22 258 10 264 L12 250 C20 246 26 240 32 232 Z" fill="' + shade + '" opacity=".4"/>';
      bf += '<path d="M-6 150 C6 147 20 148 30 152 M-4 160 C8 157 20 158 28 161" fill="none" stroke="' + deep + '" stroke-width="1.600" stroke-linecap="round" opacity=".5"/>';
      bf += '<path d="M-14 244 C-16 248 -17 250 -19 252 M15 244 C17 248 18 250 20 252" fill="none" stroke="' + deep + '" stroke-width="1.800" stroke-linecap="round" opacity=".7"/>';
      s += '<g class="niva-ba-before">' + bf + '</g>';
    }
    // hair — side-parted bob swept across the forehead, ends turning in at the jaw
    s += '<path d="M-52 236 C-60 212 -58 172 -52 146 C-46 118 -26 100 -4 98 C22 96 46 112 52 142 C57 170 57 212 53 236 C50 246 42 248 36 244 C33 241 34 238 35 234 C38 216 42 196 44 178 C42 166 38 158 28 148 C14 134 -2 126 -18 123 C-28 128 -37 140 -41 158 C-43 168 -43 176 -43 184 C-41 204 -38 222 -34 236 C-36 244 -42 249 -48 247 C-51 244 -52 240 -52 236 Z" fill="' + hair + '"/>';
    s += '<path d="M-18 123 C-24 112 -20 103 -8 99" fill="none" stroke="' + hairHi + '" stroke-width="1.800" stroke-linecap="round" opacity=".85"/>';
    s += '<path d="M-14 126 C4 126 24 136 38 152 M-10 116 C8 112 30 122 44 142" fill="none" stroke="' + hairHi + '" stroke-width="2" stroke-linecap="round"/>';
    s += '<path d="M-47 168 C-49 192 -47 218 -43 236" fill="none" stroke="' + hairHi + '" stroke-width="1.800" stroke-linecap="round" opacity=".8"/>';
    s += '</g>';
    return wrap(opts.label === undefined ? '' : opts.label, u, s);
  }

  var REG = { hair: HairCoverageCharacter, skin: SkinCoverageCharacter, surgery: CosmeticSurgeryCharacter };
  var count = 0;
  function mount(root) {
    (root || document).querySelectorAll('[data-niva-character]').forEach(function (el) {
      if (el.firstChild) return;
      var f = REG[el.getAttribute('data-niva-character')];
      if (!f) return;
      count++;
      el.innerHTML = f({ uid: 'c' + count, label: el.getAttribute('data-label') || '', ba: el.hasAttribute('data-before-after') });
    });
  }

  window.NivaCharacters = { HairCoverageCharacter: HairCoverageCharacter, SkinCoverageCharacter: SkinCoverageCharacter, CosmeticSurgeryCharacter: CosmeticSurgeryCharacter, mount: mount };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { mount(); });
  else mount();
})();
