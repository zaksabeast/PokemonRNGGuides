
function onframe()
    if (emu:getKey(0) > 0) then
        console:log("A " .. emu:currentFrame());
    end
end

callbacks:add('frame', onframe)

