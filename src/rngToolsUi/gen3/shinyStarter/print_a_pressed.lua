-- Purpose: Find offset for static Pokémon
-- To be used with mgba emulator

function getRngCount()
    return emu:read32(0x020249c0)
end
  
function getRngValue()
    return emu:read32(0x03005d80)
end

--[[
function onframe()
    if (emu:getKey(0) > 0) then
        console:log("A Frame=" .. emu:currentFrame() .. " Adv=" .. getRngCount() .. " Rng=" .. getRngValue());
    end
end
--]]

function onframe()
    if (emu:getKey(0) > 0 and emu:getKey(1) > 0) then
        console:log("A+B Frame=" .. emu:currentFrame());
    end
    if (emu:getKey(0) > 0 and emu:getKey(1) == 0) then
        console:log("A Frame=" .. emu:currentFrame());
    end
    if (emu:getKey(0) == 0 and emu:getKey(1) > 0) then
        console:log("B Frame=" .. emu:currentFrame());
    end
end

callbacks:add('frame', onframe)
