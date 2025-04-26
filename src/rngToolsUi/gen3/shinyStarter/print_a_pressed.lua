-- Purpose: Find offset for static Pokémon
-- To be used with mgba emulator

function onframe()
    if (emu:getKey(0) > 0) then
        console:log("A " .. emu:currentFrame());
    end
end

callbacks:add('frame', onframe)
